import { createContext } from "react";
import { useLocalStorage } from "../hooks/util/useLocalStorage";

export const usersContext = createContext()

const UserContextProvider = ({children}) => {
    const [ users, setUsers ] = useLocalStorage('users', [])

    return (
    <usersContext.Provider value={{users, setUsers}}>
        {children}
    </usersContext.Provider>
    )
}

export default UserContextProvider
