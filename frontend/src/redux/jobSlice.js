import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:"",
    },
    reducers:{
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        singleJob:(state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        searchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        }
    }
});

export const {setAllJobs, singleJob, setAllAdminJobs, searchJobByText} = jobSlice.actions;
export default jobSlice.reducer;