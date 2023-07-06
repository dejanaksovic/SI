import { Grid, Typography, Button, ButtonGroup } from "@mui/material";
import { useDeleteCompany } from "../../hooks/companies/useDeleteCompany";
import { NavLink } from "react-router-dom";

const CompanyCard = ( { article } ) => {
    const { error, loading, deleteCompany } = useDeleteCompany()
    const createdAtDate = new Date(article.createdAt)
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
                  <p>Telefon: {article?.contact?.tel} </p>
                  <p>Email: {article?.contact?.email}</p>
              </div>
            </NavLink>
              <ButtonGroup 
                sx = {{
                    marginTop: 'auto',
              }}>
                  <Button 
                  color = "warning"
                  variant = "contained">Izmeni</Button>
                  <Button 
                  color = "error"
                  variant = "contained"
                  onClick={ e =>{
                    deleteCompany(article._id)
                  } }
                  disabled = {loading}
                  >Obrisi</Button>
              </ButtonGroup>
          </Grid>
     );
}
 
export default CompanyCard;