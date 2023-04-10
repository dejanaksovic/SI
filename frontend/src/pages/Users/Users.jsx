//HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//CONTEXTS
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
//COMPONENTS
import Navbar from "../../components/Navbar"
import UserCard from "../../components/UserCard";
import axios from "axios";

import { FaSearch } from "react-icons/fa";

const Users = () => {
    const { state: usersState, dispatch} = useUsers()
    const { state: authState, url } = useAuth()
    const [users, setUsers] = useState([]);

    const navigate = useNavigate()

    if(!authState.user) {
        navigate('/login')
    }

    return (
        <div>
            <Navbar />
            <main className="users-main">
                <div className="filter-container">
                    <input type="text" placeholder="Pretrazite po imenu"/>
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