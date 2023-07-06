import { createContext } from "react";
import { useLocalStorage } from "../hooks/util/useLocalStorage";

export const authContext = createContext()

const AuthContextProvider = ({children}) => {
    
    const [ user, setUser ] = useLocalStorage('user', null)

    const loginUser = (user) => {
        setUser(user)
    }

    const logOut = () => {
        setUser(null)
    }

    return (
        <authContext.Provider value={{user, loginUser, logOut, url: import.meta.env.VITE_SERVER_URL}}>
            {children}
        </authContext.Provider>
    )
    
}

export default AuthContextProvider