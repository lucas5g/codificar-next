export function Spinner({ height = '91vh'}) {
    return (
        <div className="d-flex align-items-center justify-content-center"
        style={{height}}
        
        >

        <div 
            className="spinner-border"
             role="status"
             style={{
                 width: 70,
                 height: 70
             }}
             >
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    )
}