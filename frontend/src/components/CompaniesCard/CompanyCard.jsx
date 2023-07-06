import { useParams } from "react-router-dom";
import { useDeleteCompany } from "../../hooks/companies/useDeleteCompany";

const CompanyCard = ({name, contact: {tel, email}, id}) => {
    const { error, loading, deleteCompany } = useDeleteCompany()

    return ( 
        <div className="company-card-container container d-flex justfy-content-around">
            <p> {name} </p>
            <div className="company-card-contact">
                <p>Telefon: {tel} </p>
                <p>Email: {email}</p>
            </div>
            <div className="company-card-interaction">
                <button className="btn btn-warning">Izmeni</button>
                <button className="btn btn-danger"
                onClick={ e =>{
                  deleteCompany(id)
                } }
                disabled = {loading}
                >Obrisi</button>
            </div>
        </div>
     );
}
 
export default CompanyCard;