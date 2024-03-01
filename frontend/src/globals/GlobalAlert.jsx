import { Alert, AlertTitle, Collapse, Grow, Zoom } from "@mui/material";
import "./GlobalAlert.css";
import { useAlertContext } from "../hooks/alert/useAlertContext";
import { useEffect } from "react";

const GlobalAlert = () => {
  const { message, severity, show, title } = useAlertContext();

  return ( 
    <div className="global-alert">
      <Collapse in = {show} timeout = {300}>
        <Alert sx = {{fontWeight: 600}} severity= { severity } variant="filled">
          <AlertTitle sx = {{fontWeight: 400}}>
            {title}
          </AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </div>
   )
}
 
export default GlobalAlert;