//HOOKS
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//CONTEXTS
import { authContext } from "../../context/authContext";
import { userContext } from "../../context/usersContext"
//COMPONENTS
import Navbar from "../../components/Navbar"
import UserCard from "../../components/UserCard";
import axios from "axios";

import { FaSearch } from "react-icons/fa";

const Users = () => {
    const { state: usersState, dispatch} = useContext(userContext)
    const { state: authState, url } = useContext(authContext)

    const [users, setUsers] = useState([]);

    const navigate = useNavigate()

    const handleNameSearch = ( e ) => {
        const filter = e.target.value;
        const filteredUsers = usersState.users.filter( e => e.name.match(`*${filter}*`) ) 
       
    }

    if(!authState.user) {
        navigate('/login')
    }

    useEffect( () => {

        if(usersState.users && usersState.users.count === 0) {
            return
        }

        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${url}/users`, {
                    headers: {
                        Authorization: `Bearer ${authState.user.token}`
                    }
                })
                dispatch({type: "SET_USERS", payload: res.data.users})
                setUsers(usersState.users)
            }
            catch(err) {
                console.log(err);
            }
        }

        fetchUsers()
    }
    , [])

    return (
        <div>
            <Navbar />
            <main className="users-main">
                <div className="filter-container">
                    <input type="text" onChange = {handleNameSearch} placeholder="Pretrazite po imenu"/>
                    <label htmlFor="role-search"></label>
                    <select name="" id="role-search">
                        <option value="admin">ADMIN</option>
                        <option value="boss">SEF</option>
                        <option value="user">KORISNIK</option>
                    </select>
                    <button>
                        <FaSearch />
                    </button>
                </div>
                <div className="users-container">
                    {
                       users.map ((e, i) => (
                        <UserCard name = { e.name } id = { e._id } key = { i } email = { e.email } role = { e.role }/>
                       ))
                    }
                </div>
            </main>
        </div>
    );
}

export default Users;