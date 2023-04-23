import './users.css'

//HOOKS
import { useEffect, useState } from "react";
//COMPONENTS
import Navbar from "../../../components/Navbar"
import UserCard from "../../../components/UserCard";
import { FaSearch } from "react-icons/fa";
import { useGetUsers } from "../../../hooks/users/useGetUsers";
import { useUsersContext } from "../../../hooks/users/useUsersContext";


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
            { loading === 0 && 
            <div className="container d-flex justify-content-around align-items-center">
                <div className="spinner-border text-primary loader" role="status">
                    <span className="sr-only"></span>
                </div>
            </div> }

            <div className="text text-danger">
                <h2>{error}</h2>
            </div>
            
            { users.length !== 0 && <main className="users-main">
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
                <div className="container users-container-main">
                    {
                        users.map ( (e, i ) => (
                            <UserCard name = {e.name} email = {e.email} role = {e.role} id = {e._id} key = {e._id}/>
                        ))
                    }
                </div>
            </main>}
        </div>
    );
}

export default Users;