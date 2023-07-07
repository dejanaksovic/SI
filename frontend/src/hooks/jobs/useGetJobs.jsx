import axios from "axios"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useJobContext } from "./useJobContext"

export const useGetJobs = () => {
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
    const { user, url } = useAuth()
    const { setJobs } = useJobContext()

    const getJobs = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${url}/jobs`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            console.log(res.data);
            setJobs(res.data.jobs)
            setLoading(false)
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