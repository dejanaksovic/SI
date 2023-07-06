import { useContext } from "react";
import { jobContext } from "../../context/jobContext";

export const useJobContext = () => {
    const context = useContext(jobContext)
    if( context === undefined)
        throw Error("Job context must be inside job provider")
    
    return context
}