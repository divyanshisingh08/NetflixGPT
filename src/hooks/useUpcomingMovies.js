import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies=()=>{
  //memoization
  const UpcomingMovies=useSelector(store=>store.movies.UpcomingMovies)
    //fetch data from TMDB API and update store
  const dispatch=useDispatch();
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );

    const json= await data.json();
    // console.log(json.results);
    dispatch(addUpcomingMovies(json.results))
    
  };

  useEffect(() => {
    //memoization
   !UpcomingMovies && getUpcomingMovies();
  
  
  }, [])
}

export default useUpcomingMovies;