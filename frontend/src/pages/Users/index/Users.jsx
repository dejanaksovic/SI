import './users.css'

//HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from "../../../hooks/users/useUsersContext";
import { useGetUsers } from "../../../hooks/users/useGetUsers";
//COMPONENTS
import UserCard from "../../../components/UserCard";
import { Button, Box } from "@mui/material"

const Users = () => {
    const navigate = useNavigate()

    const { loading, getUsers } = useGetUsers()
    const { users: usersState } = useUsersContext()
    const [ users, setUsers ] = useState([])

    const [filtersOn, setFiltersOn] = useState(false)

    const handleAddClick = () => {
        navigate('/users/add')
    }

    useEffect( () => {

        const getNewUsers = async () => {
            // if there are users in cache, don't make a request, expiery time is handled in context
            if(usersState?.length !== 0) {
                setUsers(usersState)
                return
            }
            await getUsers()
            setUsers(usersState)
        }

        getNewUsers()
    }, [ usersState ])

    return (
        <div>
            { !loading && 
            <div className="container d-flex justify-content-around align-items-center">
                <div className="spinner-border text-primary loader" role="status">
                    <span className="sr-only"></span>
                </div>
            </div> }

            <div className="users-title row">
                <div className="text col">
                    <h2>Korisnici <span>{users?.length}</span></h2>
                </div>
                <div className="col d-flex justify-content-center gap-4 align-items-center">
                    <Box sx = {{
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }} onClick={ e => {setFiltersOn( (prevFiltersOn) => { return !prevFiltersOn } )} }>Filteri</Box>
                    <Button variant = "contained" color = "success" sx = {{
                        maxWidth: 'fit-content',
                        padding: '.5rem 1rem'
                    }} onClick={handleAddClick}> + Dodaj korisnika</Button>
                </div>
            </div>
            
            { users.length !== 0 && <main className="users-main">
                { filtersOn && <div className="filter-container" >
                    <input type="text" placeholder="Pretrazite po imenu"/>
                    <label htmlFor="role-search"></label>
                    <select name="" id="role-search">
                        <option value="admin">ADMIN</option>
                        <option value="boss">SEF</option>
                        <option value="user">KORISNIK</option>
                    </select>
                </div> }
                <div className="container users-container-main">
                    {
                        users?.map ( (e, i ) => (
                            <UserCard name = {e.name} email = {e.email} role = {e.role} id = {e._id} key = {e._id}/>
                        ))
                    }
                </div>
            </main>}
        </div>
    );
}

export default Users;