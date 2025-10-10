import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:"",
        filters: {
            location: "",
            industry: "",
            salary: ""
        },
        filteredJobs: undefined, // Start as undefined, not empty array
        allAppliedJobs: [],
        searchedQuery:""
    },
    reducers:{
        setAllJobs: (state, action) => {
            // Remove duplicates based on job ID
            const uniqueJobs = action.payload.filter((job, index, self) =>
                index === self.findIndex(j => j._id === job._id)
            );
            state.allJobs = uniqueJobs;
            // Initialize filteredJobs as undefined when no filters are applied
            state.filteredJobs = undefined;
        },
        setSingleJob:(state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        searchJobByText: (state, action) => {
            state.searchJobByText = action.payload;

            if (!state.filters) {
                state.filters = {
                    location: "",
                    industry: "",
                    salary: ""
                };
            }
            // Apply filters when search text changes
            state.filteredJobs = applyFilters(state.allJobs, state.filters, state.searchJobByText);
        },
        setFilter: (state, action) => {
            const { filterType, value } = action.payload;
            // Ensure filters object exists
            if (!state.filters) {
                state.filters = {
                    location: "",
                    industry: "",
                    salary: ""
                };
            }
            state.filters[filterType] = value;
            // Apply filters when filter changes
            state.filteredJobs = applyFilters(state.allJobs, state.filters, state.searchJobByText);
        },
        clearFilters: (state) => {
            state.filters = {
                location: "",
                industry: "",
                salary: ""
            };
            state.searchJobByText = "";
            // Reset filteredJobs when filters are cleared
            state.filteredJobs = undefined;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});

// Helper function to apply filters
const applyFilters = (jobs, filters, searchText) => {
    // Ensure filters object exists
    if (!filters) {
        filters = {
            location: "",
            industry: "",
            salary: ""
        };
    }

    let filteredJobs = [...jobs];

    // Apply search text filter
    if (searchText) {
        filteredJobs = filteredJobs.filter(job =>
            job.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchText.toLowerCase()) ||
            job.company?.name?.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    // Apply location filter
    if (filters.location) {
        filteredJobs = filteredJobs.filter(job =>
            job.location?.toLowerCase().includes(filters.location.toLowerCase())
        );
    }

    // Apply industry filter
    if (filters.industry) {
        filteredJobs = filteredJobs.filter(job =>
            job.title?.toLowerCase().includes(filters.industry.toLowerCase()) ||
            job.company?.name?.toLowerCase().includes(filters.industry.toLowerCase())
        );
    }

    // Apply salary filter
    if (filters.salary) {
        const [minSalary, maxSalary] = filters.salary.replace(' LPA', '').replace('+', '').split('-').map(Number);

        filteredJobs = filteredJobs.filter(job => {
            if (!job.salary) return false;

            const jobSalary = job.salary;

            if (filters.salary === "15+ LPA") {
                return jobSalary >= 15;
            }

            if (maxSalary) {
                return jobSalary >= minSalary && jobSalary <= maxSalary;
            } else {
                return jobSalary >= minSalary;
            }
        });
    }

    return filteredJobs;
};
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    searchJobByText,
    setFilter,
    clearFilters,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;

export default jobSlice.reducer;