import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";

const Home = () => {
    const {state, disptach} = useContext(authContext)
    const navigate = useNavigate()

    console.log(state);

    useEffect(() => {
        if(!state.user)
            navigate('/login')
    }, [])

    return ( 
        <div>
            <Navbar />
        </div>
     );
}
 
export default Home;
<div>
    Home
</div>