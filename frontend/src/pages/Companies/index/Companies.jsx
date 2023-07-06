import CompanyCard from "../../../components/CompaniesCard/CompanyCard"
import { useEffect, useState } from "react";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";
import { useNavigate } from "react-router-dom";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";

const Companies = () => {

    const { error, loading, getCompanies } = useGetCompanies()
    const { companies } = useCompaniesContext()
    const navigate = useNavigate()

    useEffect( () => {
        getCompanies()
    }, [] )

    return ( 
        <div className="container">
            <div className="container d-flex">
                <button className="btn btn-success d-block" onClick={ (e) => {
                    e.preventDefault()
                    navigate('/companies/add')
                }}>Kreiraj kompaniju</button>
            </div>
            {
                companies?.map( e => {
                    return <CompanyCard name={ e.name } contact={ e.contact } id={e._id} key={e._id}/>
                } ) 
            }
        </div>
     );
}
 
export default Companies;