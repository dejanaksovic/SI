import { createContext, useReducer } from "react";

export const authContext = createContext()

const authReducer = (state, action) => {

   switch (action.type) {
        case "LOG_IN": {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload;
        }
        case "LOG_OUT":{
            localStorage.removeItem('user')
            return {user: null}
        }
        default:
            return state;
   }

}

export const AuthContextProvider = ({children}) => {
    
    let prevUser = localStorage.getItem('user')

    if(prevUser) {
        prevUser = JSON.parse(prevUser)
    }
    
    else {
        prevUser = null
    }

    const [state, dispatch] = useReducer(authReducer, prevUser)

    return (
        <authContext.Provider value={{state, dispatch, url: "https://dvd-api.onrender.com"}}>
            {children}
        </authContext.Provider>
    )
    
}