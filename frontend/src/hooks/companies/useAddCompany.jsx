import { useContext, useState } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useAddCompany = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useUsersContext()

    const addCompany = async (name, tel, email ) => {

        setLoading(true)

        console.log(state.user.token);

        try {
            const { data } = await axios.post(`${url}/users`, {
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
            dispatch({ type: "ADD_COMPANY", payload: data })
            setError(false)
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

    return { error, loading, addCompany }
 
}

export { useAddCompany }