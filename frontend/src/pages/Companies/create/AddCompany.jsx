import { useState } from "react";
import { useAddCompany } from "../../../hooks/companies/useAddCompany";

const AddCompany = () => {

    const { error, loading, addCompany } = useAddCompany()
    const [ name, setName ] = useState("")
    const [ tel, setTel ] = useState("")
    const [ email, setEmail ] = useState("")

    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Ime: </label>
                    <input className="form-control" value={name} onChange = {e => {setName(e.target.value)}} id="name" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="tel" className="form-label">Kontakt telefon: </label>
                    <input type="text" value={tel} onChange = {e => setTel(e.target.value)} className="form-control" id="tel" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Kontakt imejl: </label>
                    <input type="text" value = {email} onChange = {e => {setEmail(e.target.value)}} className="form-control" id="email" />
                </div>
                <button disabled = {loading} className="btn btn-primary d-block mx-auto mt-4" onClick = {(e) => {
                    e.preventDefault()
                    addCompany(name, tel, email)
                }}>KREIRAJ</button>
            </form>
        </div>
    );
}

export default AddCompany;