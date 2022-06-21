import Head from 'next/head'

import Link from 'next/link'
import { api } from '../../services/api'
import { getLastTagReact, getLastTagWeb, getProjects } from '../../utils/fetch'

export default function Project({ projects, lastTagReact, lastTagWeb }) {

    return (
        <div className="container-fluid mt-5 mb-3">
            <Head>
                <title>Cods | Projetos</title>
            </Head>
            <div className="d-flex justify-content-between ">

                <h1>Projetos</h1>
                <div>
                    <Link href='/projetos/editar'>
                        <a className='btn btn-outline-success'>
                            Editar
                        </a>
                    </Link>
                </div>
            </div>

            <hr />

            <div className="row mt-5 d-flex justify-content-center ">
                <div className="col-lg-6 table-responsive">

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Portal</th>
                                <th scope="col">Android</th>
                                <th scope="col">IOS</th>
                            </tr>
                        </thead>
                        <tbody>

                            {projects.filter(project => project.status).map((project, index) => (

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
                            )

                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}


export async function getStaticProps() {

    const lastTagWeb = await getLastTagWeb()
    const lastTagReact = await getLastTagReact()
    const projects = await getProjects()
    // console.log({lastTagWeb, lastTagReact})

    // console.log('env ' + process.env.GITLAB_KEY)
    // console.log('env url ' + process.env.GITLAB_URL_TAG)

    // console.log('revalidate projetos')
    return {
        props: {
            projects,
            lastTagReact,
            lastTagWeb
        },
        revalidate: 60 * 2
        // revalidate: 5
    }
}