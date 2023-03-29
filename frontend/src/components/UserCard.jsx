import { FaUser } from "react-icons/fa";
import { useState, useContext } from "react";
import { authContext } from "../context/authContext"
import { userContext } from "../context/usersContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCard = ({name, email, role, id}) => {

    const { dispatch } = useContext(userContext)
    const { state, url } = useContext(authContext)

    const [err, setErr] = useState(null)
    const [loading, IsLoading] = useState(false)

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
        try {
            IsLoading(true)
            const res = await axios.delete(`${url}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })

            dispatch("DELETE_USER", { payload: id })

            navigate('/')
        }

        catch(err) {
            setErr(err.response.data.err)
        }
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
                        OBRISI
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default UserCard;