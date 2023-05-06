import { useContext, useEffect, useState } from "react";
import { companiesContext } from "../../../context/companiesContext";
import { authContext } from "../../../context/authContext";
import axios from "axios";
import { useAddCompany } from "../../../hooks/companies/useAddCompany";

const AddCompany = () => {

    const { error, loading, addCompany } = useAddCompany()

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
                <button className="btn btn-primary d-block mx-auto mt-4" onClick = {handleCreate}>KREIRAJ</button>
            </form>
        </div>
    );
}

export default AddCompany;