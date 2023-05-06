import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useCompaniesContext } from "./useCompaniesContext"
import axios from "axios"

export const useChangeCompany = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const { state, url } = useAuth()
    const { dispatch } = useCompaniesContext()
    
    const changeCompany = async (id, data) => {
        setLoading(true)
        try {
            const res = await axios.put(`${url}/companies/${id}`, {...data}, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            console.log(res);
            dispatch({type: "CHANGE_COMPANY", payload: res.data})
            setLoading(false)
        }

        catch(err) {
            if(err.response) {
                if (err.response.status === 401) {
                    navigate('/login')
                    return
                }
                setError(err.response.data.err)
            }
            else if (err.headers) {
                setError("Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora")
            }
            else {
                setError(err.message)
            }
        }
        setLoading(false)
    }

    return { error, loading, changeCompany }

}