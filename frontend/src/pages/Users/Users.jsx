//HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//CONTEXTS
import { useAuth } from "../../hooks/auth/useAuth";
//COMPONENTS
import Navbar from "../../components/Navbar"
import UserCard from "../../components/UserCard";
import { FaSearch } from "react-icons/fa";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import { useUsersContext } from "../../hooks/users/useUsersContext";

const Users = () => {

    const { error, loading, getUsers } = useGetUsers()
    const { state: usersState } = useUsersContext()
    const [users, setUsers] = useState([])

    useEffect( () => {

        const getNewUsers = async () => {
            // if there are users in cache, don't make a request, expiery time is handled in context
            if(usersState.users.length !== 0) {
                setUsers(usersState.users)
                return
            }
            await getUsers()
            setUsers(usersState.users)
            console.log(usersState);
        }

        getNewUsers()
    }, [usersState])

    return (
        <div>
            <Navbar />
            { loading && <p className="text-sm text-danger">Loading!</p> }
            { error && <p className="text-danger"> { error }</p> }
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
                { users.length === 0 &&
                <p>No users found</p> }

                {
                    users.map ( (e, i ) => (
                        <UserCard name = {e.name} email = {e.email} role = {e.role} id = {e._id} key = {e._id}/>
                    )) 
                }
            </main>
        </div>
    );
}

export default Users;