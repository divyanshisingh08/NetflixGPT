import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from "./MovieList"

const GptMovieSuggestion = () => {
  const gpt=useSelector(store=>store.gpt);
  const {GptMovieNames,TMDBMovieResults}=gpt
  if(!GptMovieNames) return null;
  
  return (
    <div className='m-4 p-4 bg-black text-white bg-opacity-70'>
       <div>
        {GptMovieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={TMDBMovieResults[index]}
          />
        ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestion
