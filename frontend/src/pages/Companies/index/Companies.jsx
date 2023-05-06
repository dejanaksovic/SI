import Navbar from "../../../components/Navbar";
import CompanyCard from "../../../components/CompaniesCard/CompanyCard"
import { useEffect, useState } from "react";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";

const Companies = () => {

    const { state } = useCompaniesContext()
    const { error, loading, getCompanies } = useGetCompanies()
    const [ companies, setCompanies ] = useState([])

    useEffect( () => {

        const fetchCompanies = async () => {
            await getCompanies()
        }

        if(!state || !state.companies) {
            fetchCompanies()
        }
    }, [] )

    //Setting the local state to the state of the context
    useEffect( () => {
        setCompanies(state.companies)
    }, [state] )

    return ( 
        <div className="container">
            <Navbar/>
            {
                Array.isArray(companies) ? 
                companies.map( e => {
                    return <CompanyCard name={ e.name } contact={ e.contact } id={e._id} key={e._id}/>
                } ) :
                null
            }
        </div>
     );
}
 
export default Companies;