import { useContext, useState } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";

const useAddUser = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useUsersContext()

    const addUser = async (name, email, password, role ) => {

        setLoading(true)

        console.log(state.user.token);

        try {
            const { data } = await axios.post(`${url}/users`, {
            name,
            email,
            password,
            role
        },
            {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            }
            )
            dispatch({ type: "ADD_USER", payload: data })
            setError(false)
        }

        catch(err) {
            console.log(err);
            if(err.response) {
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

    return { error, loading, addUser }
 
}

export { useAddUser }