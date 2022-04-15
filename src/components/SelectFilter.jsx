import { useState, useEffect } from 'react'
export function SelectFilter({ options, name, changeSelected  }, props) {

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
                <option value="">{name} {options.length}</option>
                {options?.map(option => (

                    <option
                        value={option.name}
                        key={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}