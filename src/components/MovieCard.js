import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-40 pr-4 md:w-48 '> 
      <img src={IMG_CDN_URL + posterPath} alt="MovieCard" />
    </div>
  )
}

export default MovieCard
