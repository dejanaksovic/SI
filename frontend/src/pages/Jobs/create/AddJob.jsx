import { useEffect, useState } from "react";
import { useAddJob } from "../../../hooks/jobs/useAddJob";
import { useCompaniesContext } from "../../../hooks/companies/useCompaniesContext";
import { useGetCompanies } from "../../../hooks/companies/useGetCompanies";

const AddJob = () => {
    const { state } = useCompaniesContext()
    const { getCompanies } = useGetCompanies()
    const [ companies, setCompanies ] = useState([])

    useEffect( () => {
        if(!state.companies && state.companies.length === 0)
            getCompanies()
    }, [] )

    useEffect( () => {
        setCompanies(state.companies)
    }, [state] )

    const [ price, setPrice ] = useState("")
    const [ type, setType ] = useState("")
    const [ status, setStatus ] = useState("")
    const [ companyId, setCompanyId ] = useState("")

    const { error, loading, addJob } = useAddJob()

    const handleAdd = (e) => {
        e.preventDefault()
        addJob(type, price, status, companyId)
    }

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
                    <select required id="role" className="form-select" value={companyId} onChange= { e => { setCompanyId(e.target.value) }}>
                        {
                            companies.map( e => <option key={e._id} value={e._id}> {e.name}</option> )
                        }
                    </select>
                </div>
                <button disabled = {loading}  onClick={ handleAdd } className="btn btn-success d-block mx-auto mt-4">KREIRAJ</button>
                <form-group>
                    <p className="text-sm text-danger">{error}</p>
                </form-group>
            </form>
        </div>
     );
}
 
export default AddJob;