import { useContext } from "react";
import { authContext } from "../../context/authContext";

const useAuth = () => {
    const { state, dispatch, url } = useContext(authContext)

    if(state === undefined)
        throw Error("UseAuth must be used inside auth context")

    return  { state, dispatch, url }
}

export { useAuth }
