import { createContext } from "react";
import { useLocalStorage } from "../hooks/util/useLocalStorage";

export const authContext = createContext()

export const AuthContextProvider = ({children}) => {
    
    const [ user, setUser ] = useLocalStorage('user', null)

    const loginUser = (user) => {
        setUser(user)
    }

    const logOut = () => {
        setUser(null)
    }

    return (
<<<<<<< HEAD
        <authContext.Provider value={{user, loginUser, logOut, url: import.meta.env.VITE_SERVER_URL}}>
=======
        <authContext.Provider value={{state, dispatch, url: "http://localhost:3000"}}>
>>>>>>> f8f26d305f4bf461cbfcd2d89ab5b3d31b347dd3
            {children}
        </authContext.Provider>
    )
    
}