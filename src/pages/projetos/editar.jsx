import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import { Input } from "../../components/Input";
import { Spinner } from "../../components/Spinner";
import { TextCenter } from "../../components/TextCenter";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

export default function ProjectEdit() {

    // const [error, setError] = useState(false)
    const [project, setProject] = useState({})
    const [projects, setProjects] = useState([])

    const [sendData, setSendData] = useState(false)

    const { data, error } = useFetch('/projetos')

    useEffect(() => {
        if (data) {
            console.log('fetch')
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

    // const { projects } = data
    return (
        <div className="container-fluid mt-5">
            <Head>
                <title>Cods | Projetos </title>
            </Head>

            <div className="d-flex justify-content-between">
                <h1>Projetos Editar</h1>
                <div>
                    <Link href='/projetos'>
                        <a className='btn btn-outline-success'>
                            Voltar
                        </a>
                    </Link>
                    &ensp;

                    <button className='btn btn-outline-primary ml-5'
                        onClick={() => {
                            setProject({})
                            document.getElementById('name').focus()
                        }}
                    >
                        Criar
                    </button>
                </div>

            </div>
            <hr />
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6">

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Portal</th>
                                <th scope="col">Android</th>
                                <th scope="col">IOS</th>
                                <th scope="col">Status</th>
                            </tr>

                        </thead>
                        <tbody>

                            {projects.map((project, index) => (
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
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6 mt-2">
                    <Form
                        project={project}
                        setProject={setProject}
                        projects={projects}
                        setProjects={setProjects}
                        // setUpdateList={setUpdateList}
                        sendData={sendData}
                        setSendData={setSendData}
                    />
                </div>

            </div>
        </div>
    )
}
function Form({ project, setProject, projects, setProjects, setSendData, sendData }) {

    // console.log(project)

    function handleChange(event) {
        const { name, value } = event.target

        setProject({
            ...project,
            [name]: value
        })
    }

    return (

        <form 
            onSubmit={async (event) => {
            event.preventDefault()
            if (!project.id) {

                try {

                    setSendData(true)
                    const { data } = await api.post('/projetos', project)

                    const newListProjects = [...projects, data].sort((a, b) => a.name.localeCompare(b.name))

                    setProjects(newListProjects)
                    setProject(data)
                    // setProject({})


                    setSendData(false)
                } catch (error) {
                    setSendData(false)
                    console.log(error)
                    if (error.response.data) {
                        const { msg } = error.response.data
                        alert(msg)
                        return
                    }
                    alert('Erro ao cadastrar')
                }

                return
            }

            api.put(`/projetos/${project.id}`, project)
                .then(res => {
                    console.log(res.data)

                    const updateProjects = projects.map(p => {
                        if (p.id === project.id) {
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
                        label='Android Url Upload'
                        name='urlUploadAndroid'
                        value={project.urlUploadAndroid || ''}
                        placeholder='Url para upload do android'
                        handleChange={handleChange}


                    />
                </div>
                <div className="col-lg-2">

                    <Input
                        label='Android .ext'
                        name='extensionAndroid'
                        value={project.extensionAndroid || ''}
                        placeholder='Extensão'
                        handleChange={handleChange}

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
            {sendData &&
                <button type="submit" className="btn btn-primary btn-block" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only"> Carregando...</span>
                </button>
            }
            {!sendData &&
                <button type="submit" className="btn btn-primary btn-block">
                    {project.id ? 'Atualizar' : 'Cadastrar'}
                </button>
            }
        </form>
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