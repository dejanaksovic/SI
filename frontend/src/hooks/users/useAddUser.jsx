import { useContext, useState } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useAddUser = () => {
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useUsersContext()

    const addUser = async (name, email, password, role ) => {

        setLoading(true)

        try {
            const { data } = await axios.post(`${url}/users`, {
            name,
            email,
            password,
            role
        },
            {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }
            )
            dispatch({ type: "ADD_USER", payload: data })
            setMessage({ok: true, message:`Korisnik ${name} je uspesno kreiran`})
        }

        catch(err) {

            if(err.response) {
                if (err.response.status === 401) {
                    navigate('/login')
                    return
                }
                setError({ok: false, message: err.response.data.err})
            }
            else if (err.request) {
                setError({ok: false, message: 'Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora'})
            }
            else {
                setError({ok: false, message: `Greska: ${err.message}`})
            }
        }

        setLoading(false)

    }

    return { message, loading, addUser }
 
}

export { useAddUser }