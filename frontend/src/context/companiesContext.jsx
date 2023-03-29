import { useReducer } from "react";
import { createContext } from "react";

export const companiesContext = createContext()

const companiesReducer = (state, action) => {
    switch(action.type) {
        case "SET_COMPANIES":
            return action.payload
        case "ADD_COMPANY":
            return {companies: [...state.companies, action.payload]}
        case "DELETE_COMPANY":
            return {companies: state.companies.filter ( e => { e.id != payload.id })}
        default:
            return state
    }
}

export const CompaniesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(companiesReducer, {companies: null})

    return ( 
        <companiesContext.Provider value={{state, dispatch}}>
            {children}
        </companiesContext.Provider>
    );
}
 
export default CompaniesContextProvider;