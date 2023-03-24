import {FaUser, FaKey} from "react-icons/fa"
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLogin = async (e) => {
        e.preventDefault();

        try {
        const {data} = await axios.post("https://dvd-api.onrender.com/users/login", {email, password})
        console.log(data);
        }

        catch(error) {
            const { response: data } = error;
            console.log(data, error);
        }
    }
    
    return (
    <div className="login">
        <div className="login-title">
            <h1>Ulogujte se</h1>
        </div>
        <form className="login-form">
            <div className="form-group">
                <div className="input-icon-group">
                    <FaUser fill="#000A"/>
                    <input  type="text"
                            id="email"
                            value={email}
                            onChange = {(e) =>{setEmail(e.target.value)}}
                            placeholder="Imejl"/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-icon-group">
                    <FaKey fill="#000A"/>
                    <input  type="password" 
                            id="password"
                            placeholder="Sifra"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            </div>
            <button onClick={onLogin} className="login-button">Pristupi</button>
        </form>    
    </div>
    );
}
 
export default Login;