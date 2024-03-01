import CompanyCard from "../../../components/CompaniesCard/CompanyCard"
import { useEffect, useState } from "react";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";
import { useNavigate } from "react-router-dom";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { Grid, Button, Box } from "@mui/material";
import { useAuth } from "../../../hooks/auth/useAuth";

const Companies = () => {

    const { error, loading, getCompanies } = useGetCompanies()
    const { companies } = useCompaniesContext()
    const { user } = useAuth();
    const navigate = useNavigate()

    useEffect( () => {
        getCompanies()
    }, [] )

    return ( 
      <Box>
        <Grid sx = {{
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
            {
                companies?.map( e => {
                    return <CompanyCard key = {e._id} article = {e}/>
                } ) 
            }
        </Grid>
        { user?.user?.role !== "USER" && <Button
         variant = "contained"
         color = "primary"
         sx = {{
            display: 'block',
            margin: '0 auto'
         }}
         onClick = { e => {
            navigate('/companies/add')
         } }>
            Dodaj kompaniju
        </Button>}
      </Box>
     );
}
 
export default Companies;