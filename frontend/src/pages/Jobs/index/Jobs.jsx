import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import JobsCard from "../../../components/JobsCard/JobsCard";
import { useGetJobs } from "../../../hooks/jobs/useGetJobs";
import { useJobContext } from "../../../hooks/jobs/useJobContext";

const Jobs = () => {
    
    const { error, loading, getJobs } = useGetJobs()
    const [ jobs, setJobs ] = useState([])

    const { state } = useJobContext()

    useEffect( () => {
        if(!state || !state.jobs)
            console.log("Doing it");
            getJobs()
    }, [] )

    useEffect( () => {
        setJobs(state.jobs)
    }, [state] )

    return ( 
    <div>
    <Navbar />
    { jobs && jobs.length > 0 ?
    jobs.map( e => <JobsCard id={e._id} type = {e.type} price={ e.price }/> )
    : null  
    } 
    </div> );
}
 
export default Jobs;