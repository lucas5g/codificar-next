import Head from 'next/head'
import { Spinner } from '../../components/Spinner'
import { TextCenter } from '../../components/TextCenter'
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../../services/api'

export default function Project() {

    const [update, setUpdate] = useState(false)
    const [project, setProject] = useState({})
    const [projects, setProjects] = useState([])
    const { data, error } = useFetch('/projetos')


    useEffect(() => {
        if (data) {

            setProjects(data.projects)
        }
    }, [data])


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
    const { lastTagReact, lastTagWeb } = data



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
                        <Form
                            project={project}
                            setProject={setProject}
                            projects={projects}
                            setProjects={setProjects}
                        />
                    </div>
                }
            </div>
        </div>
    )
}


function Form({ project, setProject, projects, setProjects }) {

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

            if(!project.id){

                api.post('/projetos', project)
                    .then(res => {
                        console.log(res.data)

                        // setProject(res.da)

                        setProjects([
                            ...projects,
                            project
                        ])

                    })
                    .catch(error => {
                        console.log(error)
                        alert('Erro ao cadastrar')
                        location.reload()
                    })

                return
            }

            api.put(`/projetos/${project.id}`, project)
                .then(res => {
                    console.log(res.data)

                    const updateProjects = projects.map( p => {
                        if(p.id === project.id ){
                            return project
                        }
                        return p
                    })

                    setProjects(updateProjects)

                })
                .catch(error => {
                    console.log(error)
                    alert('Erro ao atualizar')
                    location.reload()
                })


        }}>
            <Input
                label='Nome'
                name='name'
                value={project.name || ''}
                handleChange={handleChange}
                placeholder='Nome do Cliente'

            />
            <div className="row">
                <div className="col-lg-10">

                    <Input
                        label='Portal'
                        name='portal'
                        value={project.portal || ''}
                        handleChange={handleChange}
                        placeholder='URL do Portal'


                    />
                </div>
                <div className="col-lg-2">

                    <Input
                        label='Portal Tag'
                        name='versionWeb'
                        value={project.versionWeb || ''}
                        handleChange={handleChange}
                        placeholder='versão'


                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10">
                    <Input
                        label='Android'
                        name='android'
                        value={project.android || ''}
                        handleChange={handleChange}
                        placeholder='URL do Google Play'

                    />
                </div>
                <div className="col-lg-2">
                    <Input
                        label='Android Tag'
                        name='versionAndroid'
                        value={project.versionAndroid || ''}
                        handleChange={handleChange}
                        placeholder='Versão'

                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-10">

                    <Input
                        label='IOS'
                        name='ios'
                        value={project.ios || ''}
                        handleChange={handleChange}
                        placeholder='URL da Apple Store'

                    />
                </div>
                <div className="col-lg-2">

                    <Input
                        label='IOS Tag'
                        name='versionIos'
                        value={project.versionIos || ''}
                        handleChange={handleChange}
                        placeholder='Versão'

                    />
                </div>
            </div>
            <Select
                label="Status"
                name="status"
                handleChange={handleChange}
                value={project.status || ''}

            />

            <button type="submit" className="btn btn-primary">
                {project.id ? 'Atualizar' : 'Cadastrar'}
            </button>
        </form>
    )
}

function Input({ name, label, value, handleChange, placeholder }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="name"
                className="form-control"
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required

            />
        </div>
    )
}

function Select({ name, label, value, handleChange }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                name={name}
                id={name}
                className="form-control"
                onChange={handleChange}
                value={value}
            // required
            >
                {/* <option value="">Selecione</option> */}
                <option value={true} >Ativado</option>
                <option value="" >Desativado</option>

            </select>
        </div >
    )
}