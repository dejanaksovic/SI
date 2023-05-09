import { useEffect, useState } from "react";
import JobsCard from "../../../components/JobsCard/JobsCard";
import { useGetJobs } from "../../../hooks/jobs/useGetJobs";
import { useJobContext } from "../../../hooks/jobs/useJobContext";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
    
    const { error, loading, getJobs } = useGetJobs()
    const [ jobs, setJobs ] = useState([])
    const navigate = useNavigate()
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
    <div className="container d-flex">
        <button className="btn btn-success" onClick={ (e) => {
            e.preventDefault()
            navigate('/jobs/add')
        } }>Kreiraj posao</button>
    </div>
    { jobs && jobs.length > 0 ?
    jobs.map( e => <JobsCard doneDate={e.doneDate} doneBy={e.doneBy} id={e._id} status={e.status} type = {e.type} price={ e.price } key={e._id}/> )
    : null  
    } 
    </div> );
}
 
export default Jobs;