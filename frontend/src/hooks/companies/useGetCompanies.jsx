import axios from "axios"
import { useState } from "react"
import { useCompaniesContext } from "../../hooks/companies/useCompaniesContext"
import { useAuth } from "../../hooks/auth/useAuth"

const useGetCompanies = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useCompaniesContext()
    const { url, state } = useAuth()

    const getCompanies = async () => {
        console.log("Api for the thing");
        setLoading(true)
        try {

            const { data } = await axios.get(`${url}/companies`, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            dispatch({ type: "SET_COMPANIES", payload: data.companies })
            setError(null)
        }

        catch(err) {
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

    return { error, loading, getCompanies }
 
}

export { useGetCompanies }