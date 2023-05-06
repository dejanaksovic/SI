import { createContext, useReducer } from "react";

const setLocal = (payload) => {
    localStorage.setItem('jobs', JSON.stringify(payload))
}

export const jobContext = createContext()

const jobReducer = (state, action) => {
    switch(action.type) {
        case "SET_JOBS": {
            setLocal({jobs: action.payload})
            return {jobs: action.payload}
        }
        case "ADD_JOB": {
            setLocal({jobs: [...state.jobs, action.payload]})
            return {jobs: [...state.jobs, action.payload]}
        }
        case "DELETE_JOB": {
            console.log(action.payload._id);
            setLocal({jobs: state.jobs.filter( e => e._id !== action.payload._id )})
            return {jobs: state.jobs.filter( e => e._id !== action.payload._id )}
        }
        case "CHANGE_JOB": {
            setLocal({jobs: [...state.jobs.filter( e => e._id !== action.payload._id ), action.payload]})
            return {jobs: [...state.jobs.filter( e => e._id !== action.payload._id ), action.payload]}
        }
    }
}

const JobContextProvider = ({children}) => {
    let initJobs = localStorage.getItem('jobs')
    
    if(initJobs) {
        initJobs = JSON.parse(initJobs)
    }
    else {
        initJobs = {jobs: []}
    }

    const [state, dispatch] = useReducer(jobReducer, initJobs)

    return (
    <jobContext.Provider value={{state, dispatch}}>
        {children}
    </jobContext.Provider>
    )
}

export default JobContextProvider