import { createContext, useState } from "react";

export const notificationContext = createContext();

const GlobalNotificationContextProvider = ({children}) => {
  
  const [ message, setMessage ] = useState("");
  const [ severity, setSeverity ] = useState("info")
  const [ title, setTitle ] = useState("")
  const [ show, setShow ] = useState(false)

  const newMessage = (message, severity, title = null) => {
    setMessage(message)
    setSeverity(severity)
    setTitle(title)
    setShow(true)
    setTimeout(() => {
      setShow(false);
      console.log("out of timeout")
    }, 3000)
  }

  return (
    <notificationContext.Provider value = {{newMessage, title, message, show, severity}}>
      {children}
    </notificationContext.Provider>
  )
}

export default GlobalNotificationContextProvider;