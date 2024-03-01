import axios from "axios"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useAlertContext } from "../alert/useAlertContext"
import { useJobContext } from "./useJobContext"

export const useSignJob = () => {
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState()
  const { url, user } = useAuth();
  const { newMessage } = useAlertContext();
  const { setJobById } = useJobContext();

  const signUpForJob = async(jobId) => {
    try {
      const res = await axios.put(`${url}/jobs/sign/${jobId}`, {}, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      setJobById(res.data.job);
      newMessage("Uspesno prijavljivanje za posao")
  }
    catch(err) {
      console.log(err);
      if(err.data) {
        newMessage(err?.data?.err, "error", "Neuspesan zahtev za posao")
      }
      else {
        newMessage("Greska sa nase strane", "error", "Neuspesan zahtev za posao")
      }
    }
  }
  
  return { loading, data, signUpForJob }
}