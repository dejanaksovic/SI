import { Link } from "react-router-dom";

const Navbar = () => {
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
                <li>
                    <Link to={"/users"}>Korisnici</Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;