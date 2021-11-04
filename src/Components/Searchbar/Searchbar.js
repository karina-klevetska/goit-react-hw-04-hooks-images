import { useState } from 'react'
import PropTypes from 'prop-types'
import './Searchbar.css'

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (searchQuery.trim() === '') {
      alert('please type your query')
      return
    }
    onSubmit(searchQuery)
    setSearchQuery('')
  }

  return (
    <header className='Searchbar'>
      <form className='SearchForm' onSubmit={handleSubmit}>
        <button type='submit' className='SearchForm-button'>
          <span className='SearchForm-button-label'>Search</span>
        </button>

        <input
          className='SearchForm-input'
          type='text'
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}

export default Searchbar
