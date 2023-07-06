import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";

const Home = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    useEffect(() => {
        if(!user)
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