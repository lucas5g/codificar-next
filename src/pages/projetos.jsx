import Head from "next/head";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Spinner } from "../components/Spinner";
import { TextCenter } from "../components/TextCenter";
import { useFetch } from "../hooks/useFetch";

export default function Settings() {

    const [project, setProject] = useState({})
    const { data: projects, error } = useFetch('/projetos')

  
    if (error) {
        return (
            <TextCenter text="Erro ao conectar com o servidor :(" height="80vh" />

        )
    }


    if (!projects) {
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
            <h1>Configurações</h1>
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

                    />
                </div>
            </div>
        </div>
    )
}


function Form({ project }) {

    function handleChange(event) {
        const { name, value } = event.target

        setProject({
            ...project,
            [name]: value
        })
    }

    return (
        <form>
            <Input
                label="Nome"
                name="name"
                placeholder="Nome do grupo do projeto"
                value={project.name || ''}
                onChange={handleChange}

            />
            <Input
                label="Projeto ID Redmine"
                name="projectIdRedmine"
                placeholder="Projeto ID Redmine"
                value={project.projectIdRedmine || ''}
                onChange={handleChange}
            />
            <Input
                label="Canal Rocket"
                name="channelRocket"
                placeholder="Ex: #marketplace"
                value={project.channelRocket || ''}
                onChange={handleChange}
            />
            <Input
                label="QA"
                name="qa"
                placeholder="Ex: @lucas.sousa"
                value={project.qa || ''}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary btn-block">
                {project.id ? 'Atualizar' : 'Cadastrar'}
            </button>

        </form>
    )
}