import { useEffect } from "react";
import JobsCard from "../../../components/JobsCard/JobsCard";
import { useGetJobs } from "../../../hooks/jobs/useGetJobs";
import { useJobContext } from "../../../hooks/jobs/useJobContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import { useAuth } from "../../../hooks/auth/useAuth";

const Jobs = () => {
    const { error, loading, getJobs } = useGetJobs()
    const navigate = useNavigate()
    const { jobs } = useJobContext()
    const { user } = useAuth();

    useEffect( () => {
            getJobs()
    }, [] )

    return ( 
    <Box>
    <Container sx = {{
        display: {
          xs: 'flex',
          sm: "flex",
          md: 'flex',
          lg: 'grid', 
        },
        gridTemplateColumns: 'repeat(4, 1fr)',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem',
    }}>
    { jobs && jobs.length > 0 ?
    jobs.map( e => <JobsCard  key={e._id} job={e}/> )
    : null  
    } 
    </Container>
    { user?.user?.role !== "USER" && <Button
        sx = {{
            display: 'block',
            margin: '0 auto',
        }}
        variant = "contained"
        color = "primary"
        onClick={ (e) => {
        e.preventDefault()
        navigate('/jobs/add')
    }}>Kreiraj posao</Button>}
    </Box>);
}
 
export default Jobs;