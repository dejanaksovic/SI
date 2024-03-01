import { useState } from 'react'
import { useAuth } from './useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAlertContext } from '../alert/useAlertContext'

const useLogin = () => {
    const { newMessage } = useAlertContext();

    const navigate = useNavigate()
    const [loading, setLoading] = useState(null)

    const { loginUser, url } = useAuth()

    const login = async(email, password) => {
        setLoading(true)
        
        try {
            const response = await axios.post(`${url}/users/login`, {
                email,
                password
            })

            newMessage(null, "success", "Uspesno logovanje")

            loginUser(response.data)
            navigate('/')
        }

        catch(err) {
            if(err.response) {
                newMessage(err.response.data.err, "error", "Neuspesno logovanje");
            }

            else if(err.request) {
                newMessage("Greska je sa nase strane, pokusajte kasnije ili kontaktirajte administratora", "error", "Neuspesno logovanje")
            }

            else {
                newMessage("Greska je sa nase strane, pokusajte kasnije ili kontaktirajte administratora", "error", "Neuspesno logovanje")
           }
        }

        setLoading(false)
    }

    return { loading, login}
}

export { useLogin }