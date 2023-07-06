import CompanyCard from "../../../components/CompaniesCard/CompanyCard"
import { useEffect, useState } from "react";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";
import { useNavigate } from "react-router-dom";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { Grid, Button, Box } from "@mui/material";

const Companies = () => {

    const { error, loading, getCompanies } = useGetCompanies()
    const { companies } = useCompaniesContext()
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
                    return <CompanyCard article = {e}/>
                } ) 
            }
        </Grid>
        <Button
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
        </Button>
      </Box>
     );
}
 
export default Companies;