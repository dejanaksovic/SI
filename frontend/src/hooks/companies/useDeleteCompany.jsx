import axios from "axios"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useCompaniesContext } from "./useCompaniesContext"

export const useDeleteCompany = () => {
   const [ error, setError ] = useState(0)
   const [ loading, setLoading ] = useState(0)
   const { url, user } = useAuth()
   const { removeCompanyById } = useCompaniesContext()

   const deleteCompany = async ( id ) => {
      
      try{ 
         const res = await axios.delete( `${url}/companies/${id}`, {
         headers: {
            Authorization: `Bearer ${user.token}`
         }
      } )
         console.log(res.data);
         removeCompanyById(id)
   }
      catch(err) 
         {
            console.log(err);
         }
   }

   return { error, loading, deleteCompany }
}

