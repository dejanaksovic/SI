import './style.css'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsersContext } from '../../../hooks/users/useUsersContext';
import Navbar from '../../../components/Navbar';
import { useChangeUser } from '../../../hooks/users/useChangeUser';

const ChangeUserForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { state } = useUsersContext()

    const [user, setUser] = useState(null)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const {error, loading, changeUser} = useChangeUser()

    const handleChange = async (e) => {
        e.preventDefault()

        changeUser(id, name , email, password, role)
    }

    useEffect( () => {
        console.log(state.users.filter( e => e._id === id ));
        setUser( state.users.filter( e => e._id === id )[0] )
    }, [] )

    return ( 
        <div>
            <Navbar />
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
                            <label htmlFor="role" className="form-label">CIN: tr: {user.role}</label>
                            <select id="role" value={role} onChange={ e => {
                                setRole(e.target.value)
                            } }>
                                <option value="ADMIN">ADMIN</option>
                                <option value="BOSS">SEF</option>
                                <option value="USER">KORISNIK</option>
                            </select>
                        </div>
                        <button className="btn btn-warning d-block mx-auto mt-4" disabled = {loading} onClick={ handleChange } >IZMENI</button>
                </form>
                { error && ( <p className='text-sm text-danger'> {error} </p> ) }
            </div> }
        </div>
     );
}
 
export default ChangeUserForm;