const CompanyCard = ({name, contact: {tel, email}}) => {
    return ( 
        <div className="company-card-container container d-flex justfy-content-around">
            <p> {name} </p>
            <div className="company-card-contact">
                <p>Telefon: {tel} </p>
                <p>Email: {email}</p>
            </div>
            <div className="company-card-interaction">
                <button className="btn btn-warning">Izmeni</button>
                <button className="btn btn-danger">Obrisi</button>
            </div>
        </div>
     );
}
 
export default CompanyCard;