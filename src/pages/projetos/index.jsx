import Head from 'next/head'
import { Spinner } from '../../components/Spinner'
import { TextCenter } from '../../components/TextCenter'
import { useFetch } from "../../hooks/useFetch"
import { useState } from 'react'
import Link from 'next/link'

export default function Project() {

    const [update, setUpdate] = useState(false)
    const [project, setProject] = useState({})
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
                    {update &&
                        <a className='btn btn-outline-primary ml-5'
                            onClick={() => {
                                setProject({})
                                document.getElementById('name').focus()
                            }}
                        >
                            Criar
                        </a>
                    }
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
                                <th scope="col">Nome</th>
                                <th scope="col">Portal</th>
                                <th scope="col">Android</th>
                                <th scope="col">IOS</th>
                                {update &&
                                    <>
                                        <th scope="col">Status</th>
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
                                    title={`Editar ${project.name}`}
                                    onClick={() => setProject(project)}
                                    role="button"
                                >

                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>{project.versionWeb}</td>
                                    <td>{project.versionAndroid}</td>
                                    <td>{project.versionIos}</td>
                                    <td>{project.status ? 'Ativo' : 'Desativado'}</td>
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
                {update &&
                    <div className="col-lg-6 mt-1">
                        <Form project={project} setProject={setProject} />
                    </div>
                }
            </div>
        </div>
    )
}


function Form({ project, setProject }) {

    // console.log(project)

    function handleChange(event) {
        const { name, value } = event.target

        setProject({
            ...project,
            [name]: value
        })
    }

    return (

        <form onSubmit={event => {
            event.preventDefault()
        }}>
            <Input
                label='Nome'
                name='name'
                value={project.name || ''}
                handleChange={handleChange}

            />
            <Input
                label='Portal'
                name='portal'
                value={project.portal || ''}
                handleChange={handleChange}


            />
            <Input
                label='Android'
                name='android'
                value={project.android || ''}
                handleChange={handleChange}

            />
            <Input
                label='IOS'
                name='ios'
                value={project.ios || ''}
                handleChange={handleChange}

            />
            {/* <Input
                label='Staus'
                name='ios'
            // value='qwe'
            /> */}

            <button type="submit" className="btn btn-primary">
                {project.name ? 'Atualizar' : 'Cadastrar'}
            </button>
        </form>
    )
}

function Input({ name, label, value, handleChange }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="name"
                className="form-control"
                name={name}
                id={name}
                value={value}
                onChange={handleChange}

            />
        </div>
    )
}

function Select({ name, label, value }) {
    return (
        <div className="mb-3">
            <select name={name} id={name}>
                <option value={value}>{value}</option>
            </select>
        </div>
    )
}