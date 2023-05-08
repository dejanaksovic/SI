import { useContext, useState } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useChangeUser = () => {
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useUsersContext()

    const changeUser = async ( id, name, email, password, role ) => {
        name = name ? name : undefined
        email = email ? email : undefined
        password = password ? password: undefined
        role = role ? role : undefined

        

        setLoading(true)

       try {
            const response = await axios.put(`${url}/users/${id}`, {
                name,
                email,
                password,
                role
            }, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            dispatch({type: "CHANGE_USER", payload: response.data.user})
            setMessage({ok: false, message: `Korisnik je uspesno izmenjen`})
       }

       catch(err) {
            if(err.response) {
                if (err.response.status === 401) {
                    navigate('/login')
                    return
                }
                setMessage({ok: false, message: err.response.data.err})
            }
            else if (err.headers) {
                setMessage({ok: false, message:"Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora"})
            }
            else {
            setMessage({ok: false, message: err.message})
            }
       }

        setLoading(false)

    }

    return { message, loading, changeUser }
 
}

export { useChangeUser }