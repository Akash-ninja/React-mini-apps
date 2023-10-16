import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import StarRating from './StarRating'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={'akjsandjk'}
      messages={['Terrible', 'Bad', 'Just fine', 'Good', 'Amazing']}
    />
    <StarRating size={24} color='red' defaultRating={3} />
    <Test />
  </React.StrictMode>
)

function Test() {
  const [movieRating, setMovieRating] = useState(0)

  return (
    <div>
      <StarRating color='blue' onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  )
}
