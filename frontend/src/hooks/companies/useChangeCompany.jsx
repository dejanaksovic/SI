import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useCompaniesContext } from "./useCompaniesContext"
import axios from "axios"

export const useChangeCompany = () => {

    const [message, setMessage] = useState(null)
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
            setMessage({ok: true, message: "Kompanijine informacije uspesno promenjene"})
            dispatch({type: "CHANGE_COMPANY", payload: res.data.company})
        }

        catch(err) {
            if(err.response) {
                if (err.response.status === 401) {
                    navigate('/login')
                    return
                }
                setMessage(err.response.data.err)
            }
            else if (err.headers) {
                setMessage("Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora")
            }
            else {
                setMessage(err.message)
            }
        }
        setLoading(false)
    }

    return { message, loading, changeCompany }

}