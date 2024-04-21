import React from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch=useDispatch;
  const SearchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  //Search Movie in TMDB
  const SearchMovieTMDB = async (movie) => {
    const data = fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = (await data).json;
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(SearchText.current.value);
    //Make API call to get movie results

    const GptQuery =
      "Act as a Movie Recommendation System and Suggest some movies for the query :" +
      SearchText.current.value +
      "only give me names of 5 movies ,comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmal, Koi Mil Gaya";

    const GptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: GptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!GptResult.choices) return;
    console.log(GptResult.choices[0]?.message?.content);

    //my Gpt key is not working - too many request limits

    const GptMovie = GptResult.choices[0]?.message?.content.split(","); //movies return by gpt

    //Now we will search movies return by gpt by using TMDB API and show it to user (for each movie search tmdb api)
    const PromiseArray = GptMovie.map((movie) => SearchMovieTMDB(movie));
    //it will return array of promises as it is aync function so it will take some time to return results and time ,tide,js wait for none so it will not wait for one api to return result it will make api call for all 5
    //[Promise,Promise,Promise,Promise,Promise] - as query is to return 5 movies

    //convert promiseArray to data there is a function =>Promise.all and promise.all will only finish when all promise returns the resul t
    const TMDBResults= await Promise.all(PromiseArray)
    console.log(TMDBResults);
    dispatch(addGptMovieResult({GptMovieNames:GptMovie,TMDBMovieResults:TMDBResults}));
    

  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className=" w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={SearchText}
        />
        <button
          className=" col-span-3 py-2 px-4 m-4 bg-red-700 rounded-lg text-white "
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
