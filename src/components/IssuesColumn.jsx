export function IssuesColumn({ issues }) {

    if(issues.length === 0){
        return
    }
    return (

        
        <div className="col-md">
            <h6>
                {issues[0]?.status}
                &nbsp;
                ({issues.length})
            </h6>
            <div className="list-group">

                {issues.map(issue => (

                    <a href={issue.url} target="_blank" className="list-group-item list-group-item-action " key={issue.id} >
                        <div className="d-flex w-100 justify-content-between ">
                            <h6 className="mb-1 fs-8">{issue.project.name}</h6>
                            <small style={{ fontSize: 12 }}>{issue.id}</small>
                        </div>
                        {/* <hr /> */}
                        {/* <p class="mb-1">Some placeholder content in a paragraph.</p> */}
                        <small style={{ fontSize: 14 }}>{issue.subject}</small>
                    </a>

                ))}
            </div>
        </div>
    )
}