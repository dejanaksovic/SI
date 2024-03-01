import { useEffect, useState } from "react";
import { useLogin } from "../hooks/auth/useLogin";
import { Button } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, loading, login } = useLogin()
    
    const handleLogin = async (email, password) => {
        await login(email, password)
    }

    useEffect(() => {
        const nav = document.querySelector(".main-nav")
        nav.style.display = "none"
        return () => {
            nav.style.display = "block";
        }
    }, [])
    
    return (
    <div className="login">
        <div className="login-title">
            <h2>Ulogujte se</h2>
        </div>
        <form className="login-form">
            <div className="form-group">
                <div className="input-icon-group">
                    <input  type="text"
                            id="email"
                            value={email}
                            onChange = {(e) =>{setEmail(e.target.value)}}
                            placeholder="Imejl"/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-icon-group">
                    <input  type="password" 
                            id="password"
                            placeholder="Sifra"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            </div>
            <Button variant = "contained" disabled={loading} onClick = { async (e) => {
                e.preventDefault()
                handleLogin(email, password)
            }}
            className="login-button">Pristupi</Button>
            <p style={{color: "red", fontSize: "1rem"}} >{error}</p>
        </form>
    </div>
    );
}
 
export default Login;