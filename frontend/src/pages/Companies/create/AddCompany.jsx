import { useState } from "react";
import { useAddCompany } from "../../../hooks/companies/useAddCompany";
import ActionMessage from "../../../components/ActionMessage/ActionMessage";
import { 
    FormLabel,
    Input,
    Button,
    FormControl,
    Grid,
    TextField
} from "@mui/material";

const AddCompany = () => {

    const { message, loading, addCompany } = useAddCompany()
    const [ name, setName ] = useState("")
    const [ tel, setTel ] = useState("")
    const [ email, setEmail ] = useState("")

    return (
      <form>
         <Grid sx = {{
            maxWidth: 'max(60vw, 600px)',
            margin: '0 auto',
            flexDirection: 'column',
            padding: '1rem',
            gap: '1rem',
            display: 'flex',
               }}>
          <FormControl fullWidth>
              <TextField
               label = "Ime"
               value={name}
               onChange = {e => {setName(e.target.value)}}
               />
          </FormControl>
          <FormControl fullWidth>
              <TextField 
              label = "Telefon"
              value={tel}
              onChange = {e => setTel(e.target.value)}
              />
          </FormControl>
          <FormControl fullWidth>
              <TextField
               label = "Kontakt imejl"
               value = {email}
               onChange = {e => {setEmail(e.target.value)}}
               />
          </FormControl>
          <Button
               disabled = {loading}
               color = "primary"
               variant = "contained"
               sx = {{
                  display: 'block',
                  margin: '0 auto'
               }}
               onClick = {(e) => {
               e.preventDefault()
               addCompany(name, tel, email)
          }}
          >KREIRAJ</Button>
         <ActionMessage message={message} />
            </Grid>
         </form>
    );
}

export default AddCompany;