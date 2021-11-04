import { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Modal.css'
import { createPortal } from 'react-dom'

const modalWrapper = document.querySelector('#modal-wrapper')

function Modal({ onCloseModal, src, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onCloseModal()
    }
  }

  const handleClickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal()
    }
  }

  return createPortal(
    <div className='Overlay' onClick={handleClickBackdrop}>
      <div className='Modal'>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalWrapper
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default Modal
