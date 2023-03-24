import {FaUser, FaKey} from "react-icons/fa"
import axios from "axios";

const Login = () => {
    
    const onLogin = async (e) => {
        e.preventDefault();
        const tes = await fetch('http://localhost:3000/users/login', {
            Method: 'POST',
            Headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            Body: {
                email: 12345,
                password: "12345",
            },
            Cache: 'default'
          })
        console.log(tes);
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
                    <input type="text" id="email" placeholder="Imejl"/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-icon-group">
                    <FaKey fill="#000A"/>
                    <input type="password" id="password" placeholder="Sifra" />
                </div>
            </div>
            <button onClick={onLogin} className="login-button">Pristupi</button>
        </form>    
    </div>
    );
}
 
export default Login;