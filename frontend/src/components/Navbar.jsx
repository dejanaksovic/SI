import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth"
import { useEffect } from "react";

const Navbar = () => { 
    const { state } = useAuth()

    useEffect( () => {
        console.log(state.user);
    }, [state])

    return ( 
        <nav className="main-nav">
            <ul>
                <li>
                    <Link to={"/"}>Pocetna</Link>
                </li>
                <li>
                    <Link to={"/companies"}>Kompanije</Link>
                </li>
                <li>
                    <Link to={"/jobs"}>Poslovi</Link>
                </li>
                { state.user.role === "ADMIN" && <li>
                    <Link to={"/users"}>Korisnici</Link>
                </li>}
            </ul>
        </nav>
     );
}
 
export default Navbar;