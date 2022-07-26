export function Input({ name, label, value, handleChange, placeholder, type="text", required=true }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input 
                type={type}
                className="form-control"
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}

            />
        </div>
    )
}