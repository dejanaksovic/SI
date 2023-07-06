import axios from "axios"
import { useState } from "react"
import { useCompaniesContext } from "../../hooks/companies/useCompaniesContext"
import { useAuth } from "../../hooks/auth/useAuth"
import { useNavigate } from "react-router-dom"

const useGetCompanies = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setCompanies } = useCompaniesContext()
    const { url, user } = useAuth()

    const getCompanies = async () => {
        console.log("Api for the thing");
        setLoading(true)
        try {
            const { data } = await axios.get(`${url}/companies`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(data.companies);
            setCompanies(data.companies)
            setError(null)
        }

        catch(err) {
            console.log(err);
            if(err.response) {
                if (err.response.status === 401) {
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