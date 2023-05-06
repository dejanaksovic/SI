import { useContext, useState } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useChangeUser = () => {
    const [error, setError] = useState(null)
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
            else if (err.headers) {
                setError("Greska je sa nase strane, pokusajte ponovo kasnije ili kontaktirajte administratora")
            }
            else {
                setError(err.message)
            }
       }

        setLoading(false)

    }

    return { error, loading, changeUser }
 
}

export { useChangeUser }