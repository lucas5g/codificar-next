export function SelectFilter({ options, name, changeSelected, issues }) {
    return (
        <div className="col-md-4">
            <select
                className="form-select mb-1"
                style={{ fontSize: '28px', cursor: 'pointer' }}
                onChange={(event) => {
                    changeSelected(event.target.value)
                }}
            >
                <option value="">{name} ({issues.length})</option>
                {options?.map(option => (

                    <option
                        value={option.name}
                        key={option.id}
                    >
                        {option.name} ({issues.length})
                    </option>
                ))}
            </select>
        </div>
    )
}