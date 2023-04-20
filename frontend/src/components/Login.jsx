import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import {FaUser, FaKey} from "react-icons/fa"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, loading, login } = useLogin()
    
    const handleLogin = async (email, password) => {
        await login(email, password)
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
            <button disabled={loading} onClick = { async (e) => {
                e.preventDefault()
                handleLogin(email, password)
            }}
            className="login-button">Pristupi</button>
            <p style={{color: "red", fontSize: "1rem"}} >{error}</p>
        </form>
    </div>
    );
}
 
export default Login;