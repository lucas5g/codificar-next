export function TextCenter({ text }) {

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '22.5em' }
            }>
            <div>
                <h2>
                    {text}
                </h2>
            </div>
        </div>
    )
}
