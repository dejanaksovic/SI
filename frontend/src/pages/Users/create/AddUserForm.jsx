import './style.css'
import { useState } from "react";
import { useAddUser } from "../../../hooks/users/useAddUser";
import { useNavigate } from "react-router-dom";
import ActionMessage from '../../../components/ActionMessage/ActionMessage';

const AddUserFrom = () => {
    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ role, setRole ] = useState("")

    const { message, loading, addUser } = useAddUser()

    const addHandler = async (e) => {
        await addUser(name, email, password, role)
    }

    return ( 
        <div className="container d-flex justify-content-around">
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="form-label" placeholder="Ime Prezime">Korisnicko ime: </label>
                    <input required id="name" type="text" value = { name } onChange = { e => { setName(e.target.value) } } className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" typeof="email" className="form-label" placeholder="primer@gmail.com">Imejl:</label>
                    <input required id="email" type="text" value = { email } onChange = { e=> {setEmail(e.target.value)} } className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Sifra:</label>
                    <input required id="password" type="password" value = { password } onChange = { e => { setPassword(e.target.value) } } className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Titula</label>
                    <select required id="role" className="form-select" value={role} onChange= { e => { setRole(e.target.value) }}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="BOSS">SEF</option>
                        <option value="USER">KORISNIK</option>
                    </select>
                </div>
                <button disabled = {loading}  onClick={ addHandler } className="btn btn-success d-block mx-auto mt-4">KREIRAJ</button>
                { message &&
                <form-group>
                    <ActionMessage message={message}/>
                </form-group>}
            </form>
        </div>
     );
}
 
export default AddUserFrom;