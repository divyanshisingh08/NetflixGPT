import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        GptMovieNames:null,
        TMDBMovieResults:null,
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch
        },
        addGptMovieResult:(state,action)=>{
            const {GptMovieNames,TMDBMovieResults}=action.payload;
            state.GptMovieNames=GptMovieNames;
            state.TMDBMovieResults= TMDBMovieResults;
        },
    }
})

export const {toggleGptSearchView,addGptMovieResult}=gptSlice.actions
export default gptSlice.reducer