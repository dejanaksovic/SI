import { useDeleteUser } from "../hooks/users/useDeleteUser";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"

const UserCard = ({name, email, role, id}) => {

    const { error, loading, deleteUser } = useDeleteUser()
    const navigate = useNavigate()

    let color;

    switch (role) {
        case "ADMIN":
            color = "red"
            break;
        case "BOSS":
            color = "orange"
            break;
        default: 
            color = "green";
    }

    const deleteHandler = async (e) => {
       e.preventDefault()
       if(confirm(`Da li ste sigurni da zelite da obrisete korisnika ${name}`)) {
        await deleteUser(id)
        }

    }

    return ( 
        <div>
            <div className="container row user-card-container">
                <div className="col name">{name}</div>
                <div className="col email">{email}</div>
                <div className="col role" style={ {color: color} }>{role}</div>
                <div className="col d-flex gap-4">
                    <Button variant = 'contained' color = 'error' onClick={ e => {navigate(`/users/change/${id}`)} }>IZMENI</Button>
                    <Button variant = 'contained' color = 'warning'  disabled = {loading} onClick={deleteHandler} >OBRISI</Button>
                </div>
            </div>
            { error && <p className="text-sm text-danger"> {error} </p> }
        </div>
     );
}
 
export default UserCard;