import { useContext, useState } from "react";
import { useCompaniesContext } from "./useCompaniesContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useAddCompany = () => {
    const [message, setMessage] = useState(null)
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
            dispatch({ type: "ADD_COMPANY", payload: data.company })
            setMessage({ok: true, message: "Kompanija uspesno kreirana"})
        }

        catch(err) {
            if(err.response) {
                if (err.response.status === 401) {
                    navigate('/login')
                    return
                }
                setMessage({ok: false, message: err.response.data.err})
            }
            else if (err.request) {
                setMessage({ok: false, message: 'Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora'})
            }
            else {
                setMessage({ok: false, message: `Greska: ${err.message}`})
            }
        }

        setLoading(false)

    }

    return { message, loading, addCompany }
 
}

export { useAddCompany }