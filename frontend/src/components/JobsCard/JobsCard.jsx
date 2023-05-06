import { useNavigate } from "react-router-dom";
import { useDeleteCompany } from "../../hooks/companies/useDeleteCompany";

const JobsCard = ({type, price, status, id}) => {
    const { loading, error, deleteCompany } = useDeleteCompany()
    const navigate = useNavigate()

    return ( 
        <div className="company-card-container container d-flex justfy-content-around">
            <p> {type} </p>
            <div className="company-card-contact">
                <p>Cena: {price} </p>
                <p>Status: {status}</p>
            </div>
            <div className="company-card-interaction">
                <button className="btn btn-warning" onClick={(e) => {
                    e.preventDefault()
                    navigate(`/companies/change/${id}`)
                }}>Izmeni</button>
                <button className="btn btn-danger" disabled = {loading} onClick={(e) => {
                    e.preventDefault()
                    deleteCompany(id)
                }}>Obrisi</button>
            </div>
        </div>
     );
}
 
export default JobsCard;