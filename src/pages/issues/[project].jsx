import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IssuesColumn } from "../../components/IssuesColumn"
import { SelectFilter } from "../../components/SelectFilter"
import { Spinner } from "../../components/Spinner"
import { TextCenter } from "../../components/TextCenter"
// import { delay } from "../helpers"
import { useFetch } from "../../hooks/useFetch"

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

    const [clients, setClients] = useState([])
    const [trackers, setTrackers] = useState([])
    const [assigneds, setAssigneds] = useState([])

    const [clientSelected, setClientSelected] = useState('')
    const [trackersSelected, setTrackersSelected] = useState('')
    const [assignedSelected, setAssignedSelected] = useState('')

    // console.log('test', useRouter().query.project)
    const { project } = useRouter().query

    const { data, error } = useFetch(`/issues/${project}`)

    useEffect(() => {

        // setAssignedSelected('')
        setClientSelected('')

    }, [project])

    useEffect(() => {
        if (!data) {
            return
        }

        const { issues, clients, trackers, assigneds } = data

        console.log({ issues })
        let issuesFilter = issues

        issuesFilter = clientSelected === ''
            ? issuesFilter
            : issuesFilter.filter(issue => issue.client.name === clientSelected)


        issuesFilter = assignedSelected === ''
            ? issuesFilter
            : issuesFilter.filter(issue => issue.assigned_to?.name === assignedSelected)

        issuesFilter = trackersSelected === ''
            ? issuesFilter
            : issuesFilter.filter(issue => issue.tracker.name === trackersSelected)

        setNoResult(issuesFilter.length > 0 ? false : true)
        // setIssues(issuesFilter)
        setIssues(issues)

        setIssuesNew(issuesFilter.filter(issue => issue.status === 'Nova'))
        setIssuesPending(issuesFilter.filter(issue => issue.status === 'Pendente'))
        setIssuesReopened(issuesFilter.filter(issue => issue.status === 'Reaberta'))
        setIssuesInprogress(issuesFilter.filter(issue => issue.status === "Em andamento"
        ))
        setIssuesResolved(issuesFilter.filter(issue => issue.status === "Resolvida"
        ))
        setIssuesHomologation(issuesFilter.filter(issue => issue.status === "Homologação"
        ))

        setClients(clients)
        setTrackers(trackers)
        setAssigneds(assigneds)
    }, [clientSelected, trackersSelected, assignedSelected, data])

    if (error) {
        return (
            <>
                <Head>
                    <title>Cods | Error</title>
                </Head>
                <TextCenter text="Erro ao conectar com o servidor :(" height="80vh" />
            </>

        )
    }

    if (!data) {
        return (
            <>
                <Head> Cods | Issues</Head>
                <Spinner />
            </>
        )
    }

    return (


        <div className="container-fluid mt-5">
            <Head>
                <title>Cods | Issues</title>
            </Head>

            <h1>Issues > {project}</h1>
            <hr />

            <div className="row mb-4">
                <SelectFilter
                    options={clients}
                    name="Clientes"
                    changeSelected={setClientSelected}
                    issues={issues}
                    type="client"
                />

                {/* <SelectFilter
                        options={pr}
                        name="Prioridades"
                        changeSelected={setTrackersSelected}
                        issues={issues}
                        type="tracker"

                    /> */}
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