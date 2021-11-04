import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ApiService } from '../../Service/ApiService'
import ImageGallery from '../ImageGallery/ImageGallery'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import Loader from 'react-loader-spinner'
import SolidTitle from '../Titles/SolidTitle'
import './ImageList.css'

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '23128758-78bb9bd788fc6e2a491c41576'

const newApiService = new ApiService(BASE_URL, API_KEY)

function ImageList({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [largeImageId, setLargeImageId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    if (!searchQuery) {
      return
    }
    setStatus('pending')
    newApiService.searchQuery = searchQuery
    newApiService
      .searchImages()
      .then((result) => {
        setSearchResults(result)
        setStatus('resolved')
      })
      .catch((error) => {
        console.log(error)
        setStatus('rejected')
      })
  }, [searchQuery])

  const findLargeImg = () => {
    const largeImage = searchResults.find((result) => {
      return result.id === largeImageId
    })
    return largeImage
  }

  const openModal = (e) => {
    setIsModalOpen(true)
    setLargeImageId(Number(e.currentTarget.id))
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onButtonClick = () => {
    newApiService.page = 1
    newApiService
      .searchImages()
      .then((result) => {
        setSearchResults((prev) => [...prev, ...result])
        setStatus('resolved')
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      })
      .catch((error) => {
        console.log(error)
        setStatus('rejected')
      })
  }

  const paramLoadMore = searchResults.length > 0 && searchResults.length >= 12

  if (status === 'idle') {
    return (
      <div className='info-messages'>
        <SolidTitle
          titleText='Hello, I have a lot images for you. Just type your query to search
          form'
        />
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className='loader-wrapper'>
        <Loader type='TailSpin' color='#00BFFF' height={120} width={120} />
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className='info-messages'>
        <p>Error</p>
      </div>
    )
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery>
          <ImageGalleryItem
            searchResults={searchResults}
            openModal={openModal}
          />
        </ImageGallery>

        {paramLoadMore && <Button onClick={onButtonClick} />}
        {searchResults.length === 0 && (
          <div className='info-messages'>
            <p>There are no images for your query</p>
          </div>
        )}
        {isModalOpen && (
          <Modal
            largeImageId={largeImageId}
            onCloseModal={closeModal}
            src={findLargeImg().largeImageURL}
            alt={findLargeImg().tags}
          ></Modal>
        )}
      </>
    )
  }
}

ImageList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}

export default ImageList
