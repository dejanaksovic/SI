import { useContext } from "react";
import { authContext } from "../../context/authContext";

const useAuth = () => {
    const context = useContext(authContext)

    if(!context)
        throw Error("UseAuth must be used inside auth context")

    return context
}

export { useAuth }
