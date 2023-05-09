import './ActionMessage.css'

const ActionMessage = ({message}) => {
    return ( 
        <>  
            {
            message &&
            <p className={`text-sm ` + message.ok ? `text-success` : `text-danger`}>{message.message}</p>
            }
        </>
     );
}
 
export default ActionMessage;