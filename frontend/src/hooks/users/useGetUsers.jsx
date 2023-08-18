import { useUsersContext } from "./useUsersContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useState } from "react";

const useGetUsers = () => {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const { url, user } = useAuth()
    const { setUsers } = useUsersContext()
    
    const getUsers = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${url}/users`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(data);
            setUsers(data?.users)
        }

        catch(err) {
            console.log(err);
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
    }

    return { getUsers }
 
}

export { useGetUsers }