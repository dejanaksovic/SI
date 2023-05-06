import { useReducer } from "react";
import { createContext } from "react";

const setLocal = (payload) => {
    localStorage.setItem('companies', JSON.stringify(payload))
}

export const companiesContext = createContext()

const companiesReducer = (state, action) => {
    switch(action.type) {
        case "SET_COMPANIES": {
            setLocal({companies: action.payload})
            return {companies: action.payload}
        }
        case "ADD_COMPANY": {
            setLocal({companies: [...state.companies, action.payload]})
            return {companies: [...state.companies, action.payload]}
        }
        case "DELETE_COMPANY": {
            setLocal({ companies: state.companies.filter( e => e._id !== action.payload.id ) })
            return {companies: state.companies.filter ( e =>  e._id !== action.payload.id )}
        }
        case "CHANGE_COMPANY": {
            return {companies: [...state.companies.filter( e => e._id !== action.payload._id ), action.payload]}
        }
        default:
            return state
    }
}

export const CompaniesContextProvider = ({children}) => {

    let companies = localStorage.getItem('companies')

    if(companies)
        companies = JSON.parse(companies)
    
    else {
        companies = {companies: null, expires: Date.now()}
    }

    const [state, dispatch] = useReducer(companiesReducer, companies)

    return ( 
        <companiesContext.Provider value={{state, dispatch}}>
            {children}
        </companiesContext.Provider>
    );
}
 
export default CompaniesContextProvider;