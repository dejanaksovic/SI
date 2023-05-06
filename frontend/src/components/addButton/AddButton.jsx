const AddButton = ({model, addHandler, error, loading,  data}) => {
    return (
        <> 
        <button disabled = {loading} className="btn" onClick={(e) => {
            e.preventDefault()
            console.log(...data);
            addHandler(...data)}}>
            Dodaj {model}
        </button>
        <p className="text-danger text-sm">{error}</p>
        </>
     );
}
 
export default AddButton;