import { useState } from "react";
import { useJobContext } from "./useJobContext";
import { useAuth } from "../auth/useAuth";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const useChangeJob = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, state } = useAuth()
    const { dispatch } = useJobContext()

    const changeJob = async ( id, type, price, status ) => {
        type = type ? type : undefined
        price = price ? price: undefined
        status = status ? status : undefined

        setLoading(true)

       try {
            const response = await axios.put(`${url}/users/${id}`, {
                type,
                price,
                status
            }, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            dispatch({type: "CHANGE_JOB", payload: response.data.job})
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

    return { error, loading, changeJob }
 
}

export { useChangeJob }