import { useParams } from "react-router-dom";
import { useChangeJob } from "../../../hooks/jobs/useChangeJob";
import { useEffect, useState } from "react";
import { useJobContext } from "../../../hooks/jobs/useJobContext";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";


const ChangeJob = () => {

    const { id } = useParams()
    const { state } = useJobContext()
    const [job, setJob] = useState()
    const { error, loading, changeJob } = useChangeJob()
    const { state: companiesState } = useCompaniesContext()

    const [price, setPrice] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("");
    const [companyId, setCompanyId] = useState("")

    const handleChange = async () => {
        await changeJob(id, type, price, status)
    }

    useEffect( () => {
        setJob(state.jobs.filter( e => e._id === id )[0])
    }, [] )

    return ( 
        <div className="container d-flex justify-content-around">
            <form>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Cena:</label>
                    <input required id="password" type="number" value = { price } onChange = { e => { setPrice(e.target.value) } } className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Vrsta</label>
                    <select required id="role" className="form-select" value={type} onChange= { e => { setType(e.target.value) }}>
                        <option value="PPO">Protivpozarna obuka</option>
                        <option value="SA">Servisiranje aparata</option>
                        <option value="EP">Energetska pripravnost</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Status</label>
                    <select required id="role" className="form-select" value={status} onChange= { e => { setStatus(e.target.value) }}>
                        <option value="TAKEN">Odradjen</option>
                        <option value="AVAILABLE">DOSTUPAN</option>
                        <option value="STANDBY">Na cekanju</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Kompanija</label>
                    <select required id="role" className="form-select" value={companyId} onChange= { e => { setCompanyId(e.target.value); }}>
                        {
                            companiesState.companies.map( e => <option key={e._id} value={e._id}> {e.name}</option> )
                        }
                    </select>
                </div>
                <button disabled = {loading}  onClick={ handleChange } className="btn btn-warning d-block mx-auto mt-4">Izmeni</button>
                <form-group>
                    <p className="text-sm text-danger">{error}</p>
                </form-group>
            </form>
        </div>
     );
}
 
export default ChangeJob;