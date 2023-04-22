import { useState } from 'react'
import { useAuth } from './useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const { dispatch, url } = useAuth()

    const login = async(email, password) => {
        setLoading(true)
        
        try {
            const response = await axios.post(`${url}/users/login`, {
                email,
                password
            })

            setError(null)

            dispatch({type: "LOG_IN", payload: response.data})

            navigate('/')
        }

        catch(err) {
            console.log(err);
            if(err.response) {
                console.log(err.response.data);
                setError(err.response.data.err)
            }

            else if(err.request) {
                setError("Greska je sa nase strane, pokusajte kasnije ili kontaktirajte administratora")
            }

            else {
                setError(`Greska: ${err.message}`)
           }
        }

        setLoading(false)
    }

    return { error, loading, login}
}

export { useLogin }