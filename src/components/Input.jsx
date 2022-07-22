export function Input({ name, label, value, handleChange, placeholder }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="name"
                className="form-control"
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required

            />
        </div>
    )
}