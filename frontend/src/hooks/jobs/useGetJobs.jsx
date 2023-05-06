import axios from "axios"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useJobContext } from "./useJobContext"

export const useGetJobs = () => {
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
    const { state, url } = useAuth()
    const { dispatch } = useJobContext()

    const getJobs = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${url}/jobs`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            console.log(res);
            setLoading(false)
            dispatch({type: "SET_JOBS", payload: res.data.jobs})
        }
        catch(err) {
            console.log(err);
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
    }

    return { error, loading, getJobs }
}