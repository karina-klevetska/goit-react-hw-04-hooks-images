import { useState } from 'react'
import './App.css'
import Searchbar from './Components/Searchbar/Searchbar'
import ImageList from './Components/ImageList/ImageList'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery)
  }

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageList searchQuery={searchQuery} />
    </div>
  )
}

export default App
