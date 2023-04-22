import { useContext, useState } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";

const useGetUsers = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useUsersContext()

    const getUsers = async () => {

        setLoading(true)

        console.log("api trigger");

        try {

            const { data } = await axios.get(`${url}/users`, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
            dispatch({ type: "SET_USERS", payload: {...data, expiers: Date.now() + 60000} })
            setError(null)
        }

        catch(err) {
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

    return { error, loading, getUsers }
 
}

export { useGetUsers }