import { FaUser } from "react-icons/fa";
import { useDeleteUser } from "../hooks/users/useDeleteUser";
import { useNavigate } from "react-router-dom";

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
                    <button className="btn btn-warning" onClick={ e => {navigate(`/users/change/${id}`)} }>IZMENI</button>
                    <button className="btn btn-danger" disabled = {loading} onClick={deleteHandler} >OBRISI</button>
                </div>
            </div>
            { error && <p className="text-sm text-danger"> {error} </p> }
        </div>
     );
}
 
export default UserCard;