import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movies",
    initialState:{
        NowPlayingMovies:null,
        TrailerVideo:null,
        PopularMovie:null,
        TopRatedMovie:null,
        UpcomingMovie:null
    },
    reducers:{
       addNowPlayingMovies:(state,action)=>{
        state.NowPlayingMovies=action.payload;
       } ,
       addTrailerVideo:(state,action)=>{
        state.TrailerVideo=action.payload;
       },
       addPopularMovies:(state,action)=>{
        state.PopularMovie=action.payload;
       },
       addTopRatedMovies:(state,action)=>{
        state.TopRatedMovie=action.payload;
       },
       addUpcomingMovies:(state,action)=>{
        state.UpcomingMovie=action.payload;
       }
    }
})

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies}=movieSlice.actions;
export default movieSlice.reducer;