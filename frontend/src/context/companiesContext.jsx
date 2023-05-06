import { useReducer } from "react";
import { createContext } from "react";

export const companiesContext = createContext()

const companiesReducer = (state, action) => {
    switch(action.type) {
        case "SET_COMPANIES":
            return {companies: action.payload}
        case "ADD_COMPANY": {
            console.log(state);
            return {companies: [...state.companies, action.payload]}
        }
        case "DELETE_COMPANY":
            return {companies: state.companies.filter ( e => { e.id != payload.id })}
        default:
            return state
    }
}

export const CompaniesContextProvider = ({children}) => {

    let companies = localStorage.getItem('companies')

    if(companies)
        companies = JSON.parse(companies)
    
    else {
        companies = {companies: [], expires: Date.now()}
    }

    const [state, dispatch] = useReducer(companiesReducer, companies)

    return ( 
        <companiesContext.Provider value={{state, dispatch}}>
            {children}
        </companiesContext.Provider>
    );
}
 
export default CompaniesContextProvider;