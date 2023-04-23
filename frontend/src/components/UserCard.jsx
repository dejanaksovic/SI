import { FaUser } from "react-icons/fa";
import { useDeleteUser } from "../hooks/users/useDeleteUser";

const UserCard = ({name, email, role, id}) => {

    const { error, loading, deleteUser } = useDeleteUser()

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
       await deleteUser(id)
    }

    return ( 
        <div>
            <div className="user-card-container">
                <a href={`/users/${id}`}>
                    <div className="user-name">
                        <FaUser fill={color}/>
                        <h2>{name}</h2>
                    </div>
                </a>
                <div className="user-email">
                    <p>{email}</p>
                </div>
                <div style={{color}} className="user-role">
                    <p>{role}</p>
                </div>
                <div className="user-buttons">
                    <a href={`/users/change/${id}`} className = "btn btn-warning" >
                        IZMENI
                    </a>
                    <button disabled = { loading } onClick = { deleteHandler } className = "btn btn-danger" >
                        <span className="spinner-grow-spinner-grow-sm" role="status" aria-hidden = "true"></span>
                        OBRISI
                    </button>
                </div>
            </div>
            { error && <p className = "text-danger">{error}</p> }
        </div>
     );
}
 
export default UserCard;