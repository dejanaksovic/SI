import { FaUser } from "react-icons/fa";

const UserCard = ({name, email, role, id}) => {

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
                    <a href={`/users/remove/${id}`} className = "btn btn-danger" >
                        OBRISI
                    </a>
                </div>
            </div>
        </div>
     );
}
 
export default UserCard;