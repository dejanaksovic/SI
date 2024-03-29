import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCompaniesContext } from '../../../hooks/companies/useCompaniesContext';
import { useChangeCompany } from '../../../hooks/companies/useChangeCompany';
import ActionMessage from "../../../components/ActionMessage/ActionMessage";

const ChangeCompany = () => {

    const { id } = useParams()
    const { state } = useCompaniesContext()

    const [company, setCompany] = useState()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")

    const {message, loading, changeCompany} = useChangeCompany()

    useEffect( () => {
        setCompany( state.companies.filter( e => e._id === id )[0] )
    }, [] )

    return ( 
        <div>
            { company &&
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Ime:</label>
                        <input type="text" value = {name} onChange = { e => {setName(e.target.value)} } placeholder={company.name} className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Imejl: </label>
                        <input type="text" value = {email} onChange = {e => {setEmail(e.target.value)}} placeholder={company.contact.email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tel" className="form-label">Telefon: </label>
                        <input type="text" value = {tel} placeholder= {company.contact.tel}  onChange = {e => {setTel(e.target.value)}} className="form-control" />
                    </div>
                        <button className="btn btn-warning d-block mx-auto mt-4" disabled = {loading} onClick={ (e) => {
                            e.preventDefault()
                            changeCompany(id, {name, email, tel})
                        } } >IZMENI</button>
                        <ActionMessage message={message}/>
                </form>
            </div> }
        </div>
     );
}
 
export default ChangeCompany;