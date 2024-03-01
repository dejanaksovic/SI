import { Grid, Typography, Button, ButtonGroup } from "@mui/material";
import { useDeleteCompany } from "../../hooks/companies/useDeleteCompany";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { useEffect } from "react";

const CompanyCard = ( { article } ) => {
    const { loading, deleteCompany } = useDeleteCompany()
    const createdAtDate = new Date(article.createdAt)
    const { user } = useAuth()

    useEffect(() => {
      console.log(article)
    }, [])

    return ( 
          <Grid sx = {{
              border: '2px solid',
              borderRadius: '.2rem',
              borderColor: 'secondary.main',
              padding: '1rem 2rem',
              display: 'flex',
              flexDirection: 'column'
          }}>
            <NavLink to = {`/companies/${article._id}`}>
              <Typography
                  variant = "subtitle2"
                  color = "rgba(0, 0, 0, .4)">{ `${createdAtDate.getDay()}. ${createdAtDate.getMonth()}. ${createdAtDate.getFullYear()}.` }</Typography>
              <Typography
                  variant = "h4"> {article?.name} </Typography>
              <div className="company-card-contact">
                  <p>Telefon: {article?.tel} </p>
                  <p>Email: {article?.email}</p>
              </div>
            </NavLink>
              { user?.user?.role === "ADMIN" || user?.user?.role === "BOSS" ? <ButtonGroup 
                sx = {{
                    marginTop: 'auto',
              }}>
                  <Button 
                  color = "warning"
                  variant = "contained">Izmeni</Button>
                  <Button 
                  color = "error"
                  disabled = {loading}
                  variant = "contained"
                  onClick={ e =>{
                    deleteCompany(article._id)
                  } }
                  >Obrisi</Button> 
              </ButtonGroup> :
              null }
          </Grid>
     );
}
 
export default CompanyCard;