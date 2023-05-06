import { useContext, useState } from "react";
import { useCompaniesContext } from "./useCompaniesContext";
import axios from 'axios'
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const useDeleteCompany = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const { url, state } = useContext(authContext)
    const { dispatch } = useCompaniesContext()

    const deleteCompany = async (id) => {
        console.log(id);
        setLoading(true)

        try {
            const { data } = await axios.delete(`${url}/companies/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }
            )
            console.log(data);
            dispatch({ type: "DELETE_COMPANY", payload: {id} })
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

    return { error, loading, deleteCompany }
 
}

export { useDeleteCompany }