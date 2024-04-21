import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BACKGROUND_URL } from '../utils/constants'

const GptSearchPage = () => {
  return (
    // <div>
    // <div className="absolute -z-10" >   
    // <img 
    //   src={BACKGROUND_URL}
    //   alt="background"
    // />
    //  </div>
    //   <GptSearchBar/>
    //   <GptMovieSuggestion/>
   
   
    // </div>
    <>
    <div className="fixed -z-10">
      <img className="h-screen w-screen object-cover" src={BACKGROUND_URL} alt="logo" />
    </div>
    <div className="">
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  </>
   
  )
}

export default GptSearchPage
