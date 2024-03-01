import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { useEffect } from "react";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";
import { useJobContext } from "../../../hooks/jobs/useJobContext";
import { useGetJobs } from "../../../hooks/jobs/useGetJobs";
import { getRepresentDate } from "../../../utils/parseTime";

const Company = () => {
    const { id } = useParams()
    const { getCompanyById } = useCompaniesContext()
    const { getCompanies } = useGetCompanies()
    const { getFilteredJobs } = useJobContext()
    const { getJobs } = useGetJobs()

    const navigate = useNavigate()

    const company = getCompanyById(id)
    const jobs = getFilteredJobs('company', company._id)

    useEffect( () => {
        if(!company)
            getCompanies(id)
        if(!jobs)
            getJobs()
            }, [] )

    return ( 
        <Box sx = {{
            padding: '1rem',
        }}>
            <Typography variant = "subtitle2" sx = {{color: 'lightgrey'}}>{getRepresentDate(company?.createdAt)}</Typography>
            <Typography
                variant = "h2"
                align = "center"
                >{company?.name}</Typography>
            <Box sx = {{
                display: {
                    xs: 'flex',
                    sm: 'flex',
                    md: 'grid',
                    lg: 'grid',
                    xl: 'grid',
                },
                flexDirection: 'column',
                gridTemplateColumns: '1fr 1fr',
                gap: '.2rem'
            }}>
                <Box sx = {{
                    border: '1px solid black',
                    padding: '2rem'
                }}>
                    <Typography variant="h6">Poslovi:</Typography>
                    { jobs?.map( e => <NavLink key = {e._id} to = {`/jobs/${e._id}`}>
                      <Typography sx = {{
                        ':hover': {
                            color: 'secondary.main'
                        }
                      }} variant = "body1">{e.type.charAt(0).toUpperCase() + e.type.slice(1)}</Typography>
                    </NavLink>)}
                    <Tooltip title = "Dodaj novi posao">
                      <IconButton 
                          onClick = {e => {
                              navigate(`/jobs/add?id=${id}`)
                          }}
                      >
                      </IconButton>
                    </Tooltip>
                </Box>
                <Box sx = {{
                    padding: '2rem',
                    border: '1px solid black'
                }}>
                    <Typography align = "center">Kontakt informacije</Typography>
                    <Typography variant="body1"><span style={{ fontWeight: 500 }}>Broj telefona: </span>{company.tel}</Typography>
                    <Typography variant="body1"><span style={{ fontWeight: 500 }}>Kontakt imejl: </span>{company.email}</Typography>
                </Box>
            </Box>
        </Box>
    );
}
 
export default Company;