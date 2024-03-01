import { NavLink, useNavigate } from "react-router-dom";
import { useDeleteJob } from "../../hooks/jobs/useDeleteJob";
import { ButtonGroup, Button, Typography, Box } from "@mui/material";
import { useGetCompanies } from "../../hooks/companies/useGetCompanies";
import { useCompaniesContext } from "../../hooks/companies/useCompaniesContext";
import { useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useSignJob } from "../../hooks/jobs/useSignJob";

const JobsCard = ({job}) => {
    const { loading, deleteJob } = useDeleteJob()
    const navigate = useNavigate()
    const { getCompanies } = useGetCompanies()
    const { getCompanyById } = useCompaniesContext()
    const { user } = useAuth()
    const { signUpForJob } = useSignJob();

    useEffect(() => {
        if(!getCompanyById(job.company))
            getCompanies(job.company)

        console.log("wants");
        console.log(user.user);
        console.log(job.wantedBy.includes(user.user._id));
    }, [])

    return ( 
        <Box sx = {{
            padding: '2rem',
            borderRadius: '.2rem',
            border: '2px solid',
            borderColor: `${job.status === "ODRADJEN" ? 'success.main' : 'secondary.main'}`,
        }}>
            <NavLink to = {`/jobs/${job._id}`}>
              <Typography variant = "p"> { job.status } </Typography>
              <Typography variant = "h4"> {job.type.charAt(0).toUpperCase()+job.type.slice(1)} </Typography>
              <Box>
                  <Typography>{getCompanyById(job.company)?.name}</Typography>
              </Box>
            </NavLink>
              { user?.user?.role === "ADMIN" || user?.user?.role === "BOSS" ? <ButtonGroup>
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
            </ButtonGroup> : 
                null
            }

            { user?.user?.role === "USER" && job?.status === "DOSTUPAN" && !job?.wantedBy.includes(user?.user?._id) ? 
                <Button disabled = { loading } color = "primary" variant = "contained"
                    onClick={() => {
                        signUpForJob(job?._id)
                    }}
                >Preuzmi posao</Button> :
                null 
            }
        </Box>
     );
}
 
export default JobsCard;