import { NavLink, useNavigate } from "react-router-dom";
import { useDeleteJob } from "../../hooks/jobs/useDeleteJob";
import { ButtonGroup, Button, Typography, Box } from "@mui/material";
import { useGetCompanies } from "../../hooks/companies/useGetCompanies";
import { useCompaniesContext } from "../../hooks/companies/useCompaniesContext";
import { useEffect } from "react";

const JobsCard = ({job}) => {
    const { loading, error, deleteJob } = useDeleteJob()
    const navigate = useNavigate()
    const { getCompanies } = useGetCompanies()
    const { getCompanyById } = useCompaniesContext()

    useEffect(() => {
        if(!getCompanyById(job.company))
            getCompanies(job.company)
    }, [])

    return ( 
        <Box sx = {{
            padding: '2rem',
            borderRadius: '.2rem',
            border: '2px solid',
            borderColor: `${job.status === "ODRADJEN" ? 'success.main' : 'secondary.main'}`,
        }}>
            <NavLink to = {`/jobs/${job._id}`}>
              <Typography variant = "h4"> {job.type.charAt(0).toUpperCase()+job.type.slice(1)} </Typography>
              <Box>
                  <Typography>{getCompanyById(job.company)?.name}</Typography>
              </Box>
            </NavLink>
              <ButtonGroup>
                  <Button 
                      color = "warning"
                      variant = "contained"
                      onClick={(e) => {
                      e.preventDefault()
                      navigate(`/jobs/change/${job._id}`)
                  }}>Izmeni</Button>
                <Button 
                    variant = "contained"
                    color = "error"
                    disabled = {loading}
                    onClick={(e) => {
                    e.preventDefault()
                    deleteJob(job._id)
                }}>Obrisi</Button>
            </ButtonGroup>
        </Box>
     );
}
 
export default JobsCard;