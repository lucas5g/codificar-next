import Head from "next/head";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Spinner } from "../components/Spinner";
import { TextCenter } from "../components/TextCenter";
import { useFetch } from "../hooks/useFetch";
import { api } from "../services/api";

export default function Settings() {

    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const { data, error } = useFetch('/projetos')

    useEffect(() => {
        if (data) {
            setProjects(data)
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

    return (
        <div className="container-fluid mt-5">
            <Head>
                <title>Cods | Configurações</title>
            </Head>
            <h1>Projetos</h1>
            <hr />
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Redmine ID</th>
                                <th scope="col">Canal Rocket</th>
                                {/* <th scope="col">Git Web</th>
                                <th scope="col">Git User</th>
                                <th scope="col">Git Provider</th>                                 */}
                                <th scope="col">QA</th>
                            </tr>

                        </thead>
                        <tbody>
                            {projects.map((project, index) => (
                                <tr
                                    key={project.id}
                                    role="button"
                                    title={`Editar ${project.name}`}
                                    onClick={() => setProject(project)}
                                >
                                    <th>{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>{project.projectIdRedmine}</td>
                                    <td>{project.channelRocket}</td>
                                    <td>{project.qa}</td>

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

                    />
                </div>
            </div>
        </div>
    )
}


function Form({ project, setProject, projects, setProjects }) {

    function handleChange(event) {
        const { name, value } = event.target
        // console.log({name, value})
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
                    console.log({ project })
                    try {
                        const { data } = await api.post('/projetos', project)
                        const newListProjects = [...projects, data].sort((a, b) => a.name.localeCompare(b.name))

                        setProjects(newListProjects)
                        setProject(data)
                    } catch (error) {
                        console.log(error)
                        console.log(error.response)
                        if (error.response.data) {
                            const { msg } = error.response.data
                            alert(msg)
                        }
                        // if(error.response)
                    }
                    return
                }

                try {

                    await api.put(`/projetos/${project.id}`, project)

                    const updateProjects = projects.map(p => {
                        if (p.id === project.id) {
                            return project
                        }
                        return p
                    })
                    setProjects(updateProjects)

                } catch (error) {
                    console.log(error)
                    alert('Erro ao atualizar.')
                }

            }}>
            <Input
                label="Nome"
                name="name"
                placeholder="Nome do grupo do projeto"
                value={project.name || ''}
                handleChange={handleChange}

            />
            <Input
                label="ID Redmine"
                name="projectIdRedmine"
                placeholder="Projeto ID Redmine"
                value={project.projectIdRedmine || ''}
                handleChange={handleChange}
            />
            <div className="row">
                <div className="col-lg-6">
                    <Input
                        label="Canal Rocket"
                        name="channelRocket"
                        placeholder="Ex: #marketplace"
                        value={project.channelRocket || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-lg-6">
                    <Input
                        label="QA"
                        name="qa"
                        placeholder="Ex: @lucas.sousa"
                        value={project.qa || ''}
                        handleChange={handleChange}
                    />

                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <Input
                        type="number"
                        label="Git Web"
                        name="projectIdGitWeb"
                        placeholder="Git Web Id"
                        value={project.projectIdGitWeb || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-lg-4">
                    <Input
                        type="number"
                        label="Git User"
                        placeholder="Git User Id"
                        name="projectIdGitUser"
                        value={project.projectIdGitUser || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-lg-4">
                    <Input
                        type="number"
                        label="Git Provider"
                        placeholder="Git Provider Id"
                        name="projectIdGitProvider"
                        value={project.projectIdGitProvider || ''}
                        handleChange={handleChange}
                        required={false}
                    />
                </div>
            </div>



            <button type="submit" className="btn btn-primary mx-1">
                {project.id ? 'Atualizar' : 'Cadastrar'}
            </button>

            <button
                type="button"
                className="btn btn-secondary ml-5"
                onClick={() => setProject({})}
            >
                Cancelar
            </button>

        </form >
    )
}