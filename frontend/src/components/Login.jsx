import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { authContext } from "../context/authContext"

import axios from "axios";

import {FaUser, FaKey} from "react-icons/fa"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { state, dispatch, url } = useContext(authContext)

    const navigate = useNavigate()

    const onLogin = async (e) => {

        e.preventDefault()

        setIsLoading(true)
        try {
            const res = await axios.post(`${url}/users/login`, {
                email, password
            })
            console.log(res.data);            
            dispatch({type: "LOG_IN", payload: res.data})
            navigate('/')
        }
        catch(err) {
            if(err.response)
            setError(err.response.data.err)
            else {
                setError(err.message)
            }
        }
        setIsLoading(false)
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
            <button disabled={isLoading} onClick={onLogin} className="login-button">Pristupi</button>
            <p style={{color: "red", fontSize: "1rem"}} >{error}</p>
        </form>
    </div>
    );
}
 
export default Login;