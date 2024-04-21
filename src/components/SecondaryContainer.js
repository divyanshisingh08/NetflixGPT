import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies=useSelector((store)=>store.movies);
  return (
   movies.NowPlayingMovies &&
    <div className=' bg-black'>
      <div className='mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.NowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.PopularMovie}/>
      <MovieList title={"Top Rated"} movies={movies.TopRatedMovie}/>
      <MovieList title={"Upcoming"} movies={movies.UpcomingMovie}/>
      </div>
       {/* {
        MovieList -Popular
         -MovieCards*n
        MovieList- Trending
        MovieList- Trending
        MovieList- Trending
      
       } */}
      
    </div>
  )
}

export default SecondaryContainer
