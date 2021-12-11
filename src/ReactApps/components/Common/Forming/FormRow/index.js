import './style.css'

const FormRow = ({children, label, error, className}) => {
    return (
    <div className={`form-row ${className} ${error ? "warning" : ''}`}>
        <label>{label}</label>
        {children}
        {error && <span className="form-error">
            {error}
        </span>
        }
    </div>)
}

export default FormRow