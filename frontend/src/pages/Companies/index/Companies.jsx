import Navbar from "../../../components/Navbar";
import CompanyCard from "../../../components/CompaniesCard/CompanyCard"
import { useEffect } from "react";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";

const Companies = () => {

    const { companies } = useCompaniesContext()
    const { error, loading, getCompanies } = useGetCompanies()

    useEffect( () => {
        getCompanies()
    }, [] )

    return ( 
        <div className="container">
            <Navbar/>
            { 
                companies?.map( e => {
                    return <CompanyCard name={e.name} id={e._id} key={e._id} contact={e.contact}/>
                } )                
            }
        </div>
     );
}
 
export default Companies;