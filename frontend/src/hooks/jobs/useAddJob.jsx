import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import axios from "axios"
import { useJobContext } from "./useJobContext"

const useAddJob = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const { state, url } = useAuth()

    const {dispatch} = useJobContext()

    const addJob = async (type, price, status, companyId, doneDate) => {
        console.log(type, price, status, companyId);
        setLoading(true)
        try {
            const res = await axios.post(`${url}/jobs`, {
                type,
                price,
                status,
                companyId
            }, {
                headers:{
                    Authorization: `Bearer ${state.token}`
                }
            })
            console.log(res.data);
            dispatch({type: "ADD_JOB", payload: res.data.job})
        }

        catch(err) {
            console.log(err.response.data.err);
            if(err.response) {
                if (err.response.status === 401) {
                    navigate('/login')
                    return
                }
                setError(err.response.data.err)
            }
            else if (err.request) {
                setError('Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora')
            }
            else {
                setError(`Greska: ${err.message}`)
            }
        }
        setLoading(false)
    }
    return { error, loading, addJob }
}

export {useAddJob}