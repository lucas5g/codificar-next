import Head from 'next/head'
import { TextCenter } from '../components/TextCenter'
import { useFetch } from "../hooks/useFetch"

export default function Projects() {


    const { data, error } = useFetch('/projetos')

    if (error) {
        return (
            <TextCenter text="Erro ao conectar com o servidor :(" height="80vh" />

        )
    }
    if (!data) {
        return (
            <>
                <Head>
                    <title>Cods | Projetos</title>
                </Head>
                <TextCenter text="Carregando..." height="85vh" />
            </>
        )

    }
    const { projects, lastTagReact, lastTagWeb } = data


    return (
        <div className="container mt-5 mb-3">
            <Head>
                <title>Cods | Projetos</title>
            </Head>
            <h1>Projetos</h1>
            <hr />

            <div className="row mt-5 d-flex justify-content-center ">
                <div className="col-lg-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Portal</th>
                                <th scope="col">Android</th>
                                <th scope="col">IOS</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log({lastTagWeb})}
                            {console.log('project', projects[1].version)} */}
                            {projects.map((project, index) => (
                                <tr key={project.name}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>
                                        <a href={project.portal}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${project.versionWeb === lastTagWeb ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                        >
                                            {project.versionWeb}
                                        </a>

                                    </td>
                                    <td>
                                        <a href={project.android}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${project.versionAndroid === lastTagReact ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                        >
                                            {project.versionAndroid}
                                        </a>

                                    </td>
                                    <td>
                                        <a href={project.ios}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${project.versionIos === lastTagReact ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                        >
                                            {project.versionIos}
                                        </a>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

