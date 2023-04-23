import './style.css'

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { userContext } from "../../../context/usersContext";

const ChangeUserForm = () => {

    const { id } = useParams()
    const { state, url } = useContext(authContext)
    const { dispatch } = useContext(userContext)
    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [loading, isLoading] = useState(true)
    const [err, setError] = useState(false)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleChange = async (e) => {
        isLoading(true)

        try {
            const res = await axios.put(`${url}/users/${id}`, {
                name,
                email,
                password
            },
             {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            navigate('/users')
        }

        catch(err) {
            console.log(err);
        }

        isLoading(false)
    }

    useEffect( () => {
        const fetchUser = async () => {
            const res = await axios.get(`${url}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            setUser(res.data.user)
            isLoading(false)
        }
        fetchUser()
    }, [] )

    return ( 
        <div>
            { user &&
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Ime i prezime:</label>
                        <input type="text" value = {name} onChange = { e => {setName(e.target.value)} } placeholder={user.name} className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Imejl: </label>
                        <input type="text" value = {email} onChange = {e => {setEmail(e.target.value)}} placeholder={user.email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Sifra</label>
                        <input type="password" value = {password} onChange = {e => {setPassword(e.target.value)}} className="form-control" />
                    </div>
                        <div className="form-group">
                            <label htmlFor="role" className="form-label">CIN: (tr: {user.role})</label>
                            <select id="role">
                                <option value="ADMIN">ADMIN</option>
                                <option value="BOSS">SEF</option>
                                <option value="USER">KORISNIK</option>
                            </select>
                        </div>
                        <button disabled = {loading} className="btn btn-warning d-block mx-auto mt-4" onClick = {handleChange}>IZMENI</button>
                </form>
            </div> }
        </div>
     );
}
 
export default ChangeUserForm;