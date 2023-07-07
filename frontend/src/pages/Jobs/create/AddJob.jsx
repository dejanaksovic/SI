import { useEffect, useState } from "react";
import { useAddJob } from "../../../hooks/jobs/useAddJob";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";
import { 
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button } from "@mui/material";

//UTILITIES
import { types, statuses } from "../../../utils/jobUtils";

const AddJob = () => {
    const { companies } = useCompaniesContext()
    const { getCompanies } = useGetCompanies()

    useEffect( () => {
            getCompanies()
    }, [] )

    const [ price, setPrice ] = useState("")
    const [ type, setType ] = useState("")
    const [ status, setStatus ] = useState("")
    const [ companyId, setCompanyId ] = useState("")
    const [ date, setDate ] = useState(new Date()) 

    const { error, loading, addJob } = useAddJob()

    const handleAdd = (e) => {
        e.preventDefault()
        addJob(type, price, status, companyId, date)
        setType("")
        setPrice("")
        setCompanyId("")
        setDate("")
    }

    return ( 
        <form>
            <Grid sx ={{
                maxWidth: "max(40vw, 600px)",
                margin: '0 auto',
                padding: '2rem .5rem',
                display: 'flex',
                flexDirection: "column",
                gap: '2rem',
            }}>
              <FormGroup>
                  <TextField
                      required
                      label = "Cena"
                      type="number"
                      value = { price }
                      onChange = { e => { setPrice(e.target.value) } }/>
              </FormGroup>
              <FormGroup>
                  <InputLabel id="type-label">Tip</InputLabel>
                  <Select
                      labelId="type-label"
                      id="demo-simple-select-standard"
                      value={type}
                      onChange={e => {
                          setType(e.target.value)
                      }}
                      label="Tip"
                  >
                      { types.map( type => (<MenuItem key = {type} value = {type}>{type}</MenuItem>)) }
                  </Select>
              </FormGroup>
              <FormGroup>
                <InputLabel id="status-label">Status</InputLabel>
                  <Select 
                      onChange= { e => { setStatus(e.target.value) }}
                      required
                      labelid = "status-label"
                      label = "Status"
                      value={status}>
                      { statuses.map( type => (<MenuItem key={type} value={type}>{type}</MenuItem>)) }
                  </Select>
              </FormGroup>
              { status === "ODRADJEN" ? <FormGroup>
                    <TextField 
                      type="date"
                      value={date} 
                      onChange={(e) => {setDate(e.target.value)}}
                      label={"Datum izrade"}/> 
               </FormGroup> : null}
                <FormGroup>
                    <FormLabel
                      id = "company-label">Kompanija</FormLabel>
                      <Select
                      required
                      labelId="company-label"
                      label = "Kompanija"
                      value={companyId}
                      onChange= { e => { setCompanyId(e.target.value)}}>
                          {
                              companies.map( e => <MenuItem key={e._id} value={e._id}> {e.name}</MenuItem> )
                          }
                      </Select>
                  </FormGroup>
                  <Button 
                    disabled = {loading}
                    onClick={ handleAdd }
                    variant = "contained"
                    color = "success"
                    sx = {{
                        display: 'block',
                        margin: '0 auto'
                    }}
                    >KREIRAJ</Button>
                  <form-group>
                      <p className="text-sm text-danger">{error}</p>
                  </form-group>
            </Grid>
        </form>
     );
}
 
export default AddJob;