import { useContext, useState } from "react";
import { useCompaniesContext } from "./useCompaniesContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useAddCompany = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useCompaniesContext()

    const addCompany = async (name, tel, email ) => {

        setLoading(true)

        try {
            const { data } = await axios.post(`${url}/companies`, {
            name,
            email,
            tel
        },
            {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }
            )
            console.log(data);
            dispatch({ type: "ADD_COMPANY", payload: data.company })
            setError(false)
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

        setLoading(false)

    }

    return { error, loading, addCompany }
 
}

export { useAddCompany }