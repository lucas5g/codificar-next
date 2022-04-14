import { useState, useEffect } from 'react'
export function SelectFilter({ options }) {

    // console.log(issues)
    // const [options, setOptions] = useState([])

    useEffect(() => {
        // setOptions(issues?.map(issue => issue.project))
        // console.log(options)
    }, [])
    return (
        <div className="col-md-4">
            <select
                className="form-select"
                style={{ fontSize: '28px', cursor: 'pointer' }}
                onChange={(event) => {
                    console.log(event.target.value)
                }}
            >
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