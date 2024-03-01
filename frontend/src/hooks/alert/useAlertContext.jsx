import { useContext } from "react"
import { notificationContext } from "../../context/globalNotificationContext"

export const useAlertContext = () => {
  const alertContext = useContext(notificationContext);
  if(!alertContext)
    throw new Error("Alert must be inside alert context")
  return alertContext;
}