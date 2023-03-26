import { createContext, useReducer } from "react";

export const authContext = createContext()

const authReducer = (state, action) => {

   switch (action.type) {
        case "LOG_IN": {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {user: action.payload};
        }
        case "LOG_OUT":{
            localStorage.removeItem('user')
            return null
        }
        default:
            return state;
   }

}

export const AuthContextProvider = ({children}) => {
    
    const prevUser = localStorage.getItem('user')
    const [state, dispatch] = useReducer(authReducer, {user: JSON.parse(prevUser) || {user: null}})

    return (
        <authContext.Provider value={{state, dispatch, url: "https://dvd-api.onrender.com"}}>
            {children}
        </authContext.Provider>
    )
    
}