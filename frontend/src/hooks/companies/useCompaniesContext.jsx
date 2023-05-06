import { useContext } from "react";
import { companiesContext } from "../../context/companiesContext";

const useCompaniesContext = () => {
    const context = useContext(companiesContext)
    
    if(!context)
        throw Error("The companies context must be inside companies provider")
    
    return context
}

export { useCompaniesContext }