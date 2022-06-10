import Head from 'next/head'
import { Spinner } from '../../components/Spinner'
import { TextCenter } from '../../components/TextCenter'
import { useFetch } from "../../hooks/useFetch"
import { useState } from 'react'
import Link from 'next/link'

export default function Project() {

    const [update, setUpdate] = useState(false)
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
                <Spinner />
            </>
        )

    }
    const { projects, lastTagReact, lastTagWeb } = data


    return (
        <div className="container-fluid mt-5 mb-3">
            <Head>
                <title>Cods | Projetos</title>
            </Head>
            <div className="d-flex justify-content-between ">

                <h1>Projetos</h1>
                <div>

                    <button className='btn btn-outline-success'
                        onClick={() => {
                            setUpdate(!update)
                            console.log('editar')

                        }}>
                        {update ? 'Voltar' : 'Editar'}

                    </button>
                    &ensp;
                    <Link href={"/projetos/criar"}>
                        <a className='btn btn-outline-primary ml-5'>
                            Criar
                        </a>
                    </Link>
                </div>
            </div>

            <hr />

            <div className="row mt-5 d-flex justify-content-center ">
                <div className="col-lg-6 table-responsive">

                    <table className="table">
                        <thead>
                            {/* {!update && */}
                            <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Name</th>
                                <th scope="col">Portal</th>
                                <th scope="col">Android</th>
                                <th scope="col">IOS</th>
                                {update &&
                                    <>
                                        <th scope="col">Status</th>
                                        <th scope='col'>Ação</th>
                                    </>

                                }

                            </tr>

                        </thead>
                        <tbody>

                            {update && projects.map((project, index) => (

                                <tr
                                    className={project.status ? 'bg-success' : 'bg-danger'}
                                    style={{
                                        "--bs-bg-opacity": .1
                                    }}
                                    key={project.id}
                                >
                                    {console.log(project)}

                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>{project.versionWeb}</td>
                                    <td>{project.versionAndroid}</td>
                                    <td>{project.versionIos}</td>
                                    <td>{project.status ? 'Ativo' : 'Desativado'}</td>
                                    <td role={'button'}
                                        title={`Editar ${project.name}`}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </td>
                                </tr>
                            ))}


                            {!update && projects.filter(project => project.status).map((project, index) => (

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

