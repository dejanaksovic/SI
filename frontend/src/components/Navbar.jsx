import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth"

const Navbar = () => { 
    const { user } = useAuth()

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
                { user?.role === "ADMIN" ? <li>
                    <Link to={"/users"}>Korisnici</Link>
                </li> : null }
            </ul>
        </nav>
     );
}
 
export default Navbar;