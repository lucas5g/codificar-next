import { useEffect, useState } from "react"
import { IssuesColumn } from "../components/IssuesColumn"
import { SelectFilter } from "../components/SelectFilter"
import { api } from "../services/api"

export default function Issues() {

    // const [issuesFilter, setIssuesFilter] = useState([])
    const [issuesNew, setIssuesNew] = useState([])
    const [issuesPending, setIssuesPending] = useState([])
    const [issuesReopened, setIssuesReopened] = useState([])
    const [issuesInprogress, setIssuesInprogress] = useState([])
    const [issuesResolved, setIssuesResolved] = useState([])
    const [issuesHomologation, setIssuesHomologation] = useState([])

    const [projects, setProjects] = useState([])
    const [trackers, setTrackers] = useState([])
    const [assigneds, setAssigneds] = useState([])


    useEffect(() => {
        api.get('/issues')
            .then(res => {
                const { data } = res
                const { issues, projects, trackers, assigneds } = data

                // setIssuesFilter(issues)
                const issuesFilter = issues 


                // setIssuesFilter(issuesFilter)
                setIssuesNew(issuesFilter.filter(issue => issue.status === 'Nova'))
                setIssuesPending(issuesFilter.filter(issue => issue.status === 'Pendente'))
                setIssuesReopened(issuesFilter.filter(issue => issue.status === 'Reaberta'))
                setIssuesInprogress(issuesFilter.filter(issue => issue.status === "Em andamento"
                ))
                setIssuesResolved(issuesFilter.filter(issue => issue.status === "Resolvida"
                ))
                setIssuesHomologation(issuesFilter.filter(issue => issue.status === "Homologação"
                ))

                setProjects(projects)
                setTrackers(trackers)
                setAssigneds(assigneds)
                

            })
    }, [])



    return (
        <div className="container-fluid">
            {/* <h1>Issues</h1> */}
            <div className="row mb-4">
                <SelectFilter options={projects} />
                <SelectFilter options={trackers} />
                <SelectFilter options={assigneds}/>
                
            </div>
            <div className="row">

                <IssuesColumn issues={issuesNew} />
                <IssuesColumn issues={issuesPending} />
                <IssuesColumn issues={issuesReopened} />
                <IssuesColumn issues={issuesInprogress} />
                <IssuesColumn issues={issuesResolved} />
                <IssuesColumn issues={issuesHomologation} />

            </div>


        </div>
    )
}