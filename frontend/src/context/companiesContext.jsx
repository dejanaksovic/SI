import { createContext } from "react";
import { useLocalStorage } from "../hooks/util/useLocalStorage";

export const companiesContext = createContext()

export const CompaniesContextProvider = ({children}) => {

    const [companies, setCompanies] = useLocalStorage("companies", [])

    const addNewCompany = ( newCompany ) => {
        setCompanies(prevCompanies => {
            return [...prevCompanies, newCompany]
        })
    }

    const removeCompanyById = ( id )  => {
        setCompanies( prevCompanies => {
            return [...prevCompanies.filter( e => {
                return e._id !== id
            } )]
        } )
    }

    return ( 
        <companiesContext.Provider value={{companies, setCompanies, addNewCompany, removeCompanyById}}>
            {children}
        </companiesContext.Provider>
    );
}
 
export default CompaniesContextProvider;