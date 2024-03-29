import { useState } from "react";
import { useJobContext } from "./useJobContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const useDeleteJob = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, user } = useAuth()
    const { deleteJobById } = useJobContext()

    const deleteJob = async ( id ) => {

        setLoading(true)

        try {
            const { data } = await axios.delete(`${url}/jobs/${id}`, {
            headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
            )
            console.log(data);
            deleteJobById(id)
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

    return { error, loading, deleteJob }
 
}

export { useDeleteJob }