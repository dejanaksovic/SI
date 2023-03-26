import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="main-nav">
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/companies"}>Companies</Link>
                </li>
                <li>
                    <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                    <Link to={"/users"}>Users</Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;