import { useContext } from "react";
import { usersContext } from "../../context/usersContext"

const useUsersContext = () => {
    const context = useContext(usersContext)
    if(!context)
        throw Error("User hook must be inside user context")
    
    return context
}

export { useUsersContext }