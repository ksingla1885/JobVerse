import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs:[],
        singleJob:null
    },
    reducers:{
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        singleJob:(state, action) => {
            state.singleJob = action.payload;
        }
    }
});

export const {setAllJobs, singleJob} = jobSlice.actions;
export default jobSlice.reducer;