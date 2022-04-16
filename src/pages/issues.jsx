import Head from "next/head"
import { useEffect, useState } from "react"
import { IssuesColumn } from "../components/IssuesColumn"
import { SelectFilter } from "../components/SelectFilter"
import { TextCenter } from "../components/TextCenter"
// import { delay } from "../helpers"
import { useFetch } from "../hooks/useFetch"
import { api } from "../services/api"

export default function Issues() {

    // // const [issuesFilter, setIssuesFilter] = useState([])
    const [issues, setIssues] = useState([])
    const [issuesNew, setIssuesNew] = useState([])
    const [issuesPending, setIssuesPending] = useState([])
    const [issuesReopened, setIssuesReopened] = useState([])
    const [issuesInprogress, setIssuesInprogress] = useState([])
    const [issuesResolved, setIssuesResolved] = useState([])
    const [issuesHomologation, setIssuesHomologation] = useState([])
    const [noResult, setNoResult] = useState(false)

    const [projects, setProjects] = useState([])
    const [trackers, setTrackers] = useState([])
    const [assigneds, setAssigneds] = useState([])

    const [projectSelected, setProjectSelected] = useState('')
    const [trackersSelected, setTrackersSelected] = useState('')
    const [assignedSelected, setAssignedSelected] = useState('')

    const { data, error } = useFetch('/issues')


    useEffect(() => {
        if (!data) {
            return
        }
        const { issues, projects, trackers, assigneds } = data
        let issuesFilter = issues

        issuesFilter = projectSelected === ''
            ? issuesFilter
            : issuesFilter.filter(issue => issue.project.name === projectSelected)


        issuesFilter = assignedSelected === ''
            ? issuesFilter
            : issuesFilter.filter(issue => issue.assigned_to?.name === assignedSelected)

        issuesFilter = trackersSelected === ''
            ? issuesFilter
            : issuesFilter.filter(issue => issue.tracker.name === trackersSelected)

        setNoResult(issuesFilter.length > 0 ? false : true)
        setIssues(issuesFilter)

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
    }, [projectSelected, trackersSelected, assignedSelected, data])


    return (


        <div className="container-fluid mt-5">
            <Head>
                <title>Cods | Issues</title>
            </Head>
            {error &&
                <TextCenter text="Erro ao conectar com o servidor :(" />

            }
            {!data &&
                <TextCenter text="Carregando..." />
            }

            <div className="row mb-4">
                <SelectFilter
                    options={projects}
                    name="Projetos"
                    changeSelected={setProjectSelected}
                    issues={issues}
                    type="project"
                />

                <SelectFilter
                    options={trackers}
                    name="Tipos"
                    changeSelected={setTrackersSelected}
                    issues={issues}
                    type="tracker"

                />
                <SelectFilter
                    options={assigneds}
                    name="Responsáveis"
                    changeSelected={setAssignedSelected}
                    issues={issues}
                    type="assigned_to"

                />

            </div>

            {noResult &&
                <TextCenter text="Nada encontrado :(" height="60vh" />
            }
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