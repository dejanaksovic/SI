import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext"
import { userContext } from "../../context/usersContext";

const AddUserFrom = () => {

    const { state: authState, url } = useContext(authContext)
    const { dispatch } = useContext(userContext)

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ role, setRole ] = useState("")

    const [ error, setError ] = useState(null)
    const [ loading, setIsLoading ] = useState(false)

    const navigate = useNavigate()

    const addHandler = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        console.log("ROLE:", role);

        try {

            const res = await axios.post(`${url}/users`, {
                name,
                email,
                password,
                role
              }, {
                headers: {
                  Authorization: `Bearer ${authState.user.token}`
                }
              });

            console.log(res);

            dispatch("ADD_USER", { payload: res })

            setIsLoading(false)
            }

        catch(err) {
            setIsLoading(false)
            console.log(err);
        }

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
                    <select required id="role" className="form-select" onChange= { e => { setRole(e.target.value) }}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="BOSS">SEF</option>
                        <option value="USER">KORISNIK</option>
                    </select>
                </div>
                <button disabled = {loading} onClick={ addHandler } className="btn btn-success d-block mx-auto mt-4">KREIRAJ</button>
            </form>
            { error && (<p> { error } </p>) }
        </div>
     );
}
 
export default AddUserFrom;