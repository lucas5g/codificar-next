import { useState, useEffect } from 'react'
export function SelectFilter({ options, name, changeSelected, issues }) {

    // const 

    return (
        <div className="col-md-4">
            <select
                className="form-select"
                style={{ fontSize: '28px', cursor: 'pointer' }}
                onChange={(event) => {
                    changeSelected(event.target.value)
                    // setProjectSelected(event.target.value)
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