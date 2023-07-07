import { createContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/util/useLocalStorage";

export const jobContext = createContext()

const JobContextProvider = ({children}) => {
    
    const [jobs, setJobs] = useLocalStorage("jobs", [])

    const addNewJob = (job) => {
        setJobs( prevJobs => {
            return [...prevJobs, job]
        } )
    }

    const deleteJobById = (id) => {
        setJobs( prevJobs => {
            return [...prevJobs.filter( job => job._id !== id )]
        } )
    }

    const getFilteredJobs = ( filterName, filterValue ) => {
        console.log(jobs)
        console.log(filterName, filterValue)
        jobs.forEach( e => {
            console.log(e[filterName] === filterValue)
        } )
        return jobs.filter( e => e[filterName] === filterValue )
    }

    return (
    <jobContext.Provider value={{jobs, setJobs, addNewJob, deleteJobById, getFilteredJobs}}>
        {children}
    </jobContext.Provider>
    )
}

export default JobContextProvider