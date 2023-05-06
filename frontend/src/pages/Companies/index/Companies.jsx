import Navbar from "../../../components/Navbar";
import CompanyCard from "../../../components/CompaniesCard/CompanyCard"
import { useEffect } from "react";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";

const Companies = () => {

    const { state } = useCompaniesContext()
    const { error, loading, getCompanies } = useGetCompanies()

    useEffect( () => {
        if(!state || (state.companies && !(state.companies.lenght > 0))) {
            getCompanies()
        }
    }, [state] )

    return ( 
        <div className="container">
            <Navbar/>
            {
                state ? 
                state.companies.map( e => {
                    return <CompanyCard name={ e.name } contact={ e.contact } key={e._id}/>
                } ) :
                null
            }
        </div>
     );
}
 
export default Companies;