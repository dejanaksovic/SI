import { useContext } from "react";
import { userContext } from "../../context/usersContext"

const useUsersContext = () => {
    const { state, dispatch } = useContext(userContext)
    if(!state)
        throw Error("User hook must be inside user context")
    return { state, dispatch }
}

export { useUsersContext }