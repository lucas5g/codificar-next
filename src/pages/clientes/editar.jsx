import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import { Spinner } from "../../components/Spinner";
import { TextCenter } from "../../components/TextCenter";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

export default function ClientEdit() {

    const [client, setClient] = useState({})
    const [clients, setClients] = useState([])

    const [sendData, setSendData] = useState(false)

    const { project } = useRouter().query
    const { data, error } = useFetch(`/clientes?project=${project}`)

    useEffect(() => {
        if (data) {
            console.log('mudou')
            setClients(data.clients)
            // setClient({...client, projectId: data.projectId})
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
                    <title>Cods | Clientes</title>
                </Head>
                <Spinner />
            </>
        )

    }

    const {projectId} = data
    return (
        <div className="container-fluid mt-5">
            <Head>
                <title>Cods | Clientes </title>
            </Head>

            <div className="d-flex justify-content-between">
                <h1>Cliente &gt; {project} &gt; editar</h1>
                <div>
                    <Link href={`/clientes?project=${project}`}>
                        <a className='btn btn-outline-success'>
                            Voltar
                        </a>
                    </Link>
                    &ensp;

                    <button className='btn btn-outline-primary ml-5'
                        onClick={() => {
                            setClient({})
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
                                <th scope="col">Web</th>
                                <th scope="col">Android User</th>
                                <th scope="col">IOS User</th>
                                <th scope="col">Status</th>
                            </tr>

                        </thead>
                        <tbody>

                            {clients?.map((client, index) => (
                                <tr
                                    className={client.status ? 'bg-success' : 'bg-danger'}
                                    style={{
                                        "--bs-bg-opacity": .1
                                    }}
                                    key={client.id}
                                    title={`Editar ${client.name}`}
                                    onClick={() => setClient(client)}
                                    role="button"
                                >

                                    <th scope="row">{index + 1}</th>
                                    <td>{client.name}</td>
                                    <td>{client.versionWeb}</td>
                                    <td>{client.versionAndroidUser}</td>
                                    <td>{client.versionIosUser}</td>
                                    <td>{client.status ? 'Ativo' : 'Desativado'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6 mt-2">
                    <Form
                        client={client}
                        setClient={setClient}
                        clients={clients}
                        setClients={setClients}
                        // setUpdateList={setUpdateList}
                        sendData={sendData}
                        setSendData={setSendData}
                        projectId={projectId}
                    />
                </div>

            </div>
        </div>
    )
}
function Form({ client, setClient, clients, setClients, setSendData, sendData, projectId }) {

    // console.log(project)

    function handleChange(event) {
        const { name, value } = event.target

        setClient({
            ...client,
            projectId,
            [name]: value
        })
    }

    return (

        <form 
            onSubmit={async (event) => {
            event.preventDefault()
            if (!client.id) {

                try {

                    setSendData(true)
                    const { data } = await api.post('/clientes', client)

                    const newListClients = [...clients, data].sort((a, b) => a.name.localeCompare(b.name))

                    setClients(newListClients)
                    setClient(data)
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

            api.put(`/clientes/${client.id}`, client)
                .then(res => {
                    console.log(res.data)

                    const updateClients = clients.map(c => {
                        if (c.id === client.id) {
                            return client
                        }
                        return c
                    })

                    setClients(updateClients)

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
                value={client.name || ''}
                handleChange={handleChange}
                placeholder='Nome do Cliente'

            />
            <div className="row">
                <div className="col-lg-10">

                    <Input
                        label='Web'
                        name='web'
                        value={client.web || ''}
                        handleChange={handleChange}
                        placeholder='URL do Portal'


                    />
                </div>
                <div className="col-lg-2">

                    <Input
                        label='Web Tag'
                        name='versionWeb'
                        value={client.versionWeb || ''}
                        handleChange={handleChange}
                        placeholder='Versão'


                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10">
                    <Input
                        label='Android User'
                        name='androidUser'
                        value={client.androidUser || ''}
                        handleChange={handleChange}
                        placeholder='URL do Google Play'

                    />
                </div>
                <div className="col-lg-2">
                    <Input
                        label='User Tag'
                        name='versionAndroidUser'
                        value={client.versionAndroidUser || ''}
                        handleChange={handleChange}
                        placeholder='Versão'

                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10">
                    <Input
                        label='Android User Url Upload'
                        name='urlUploadAndroidUser'
                        value={client.urlUploadAndroidUser || ''}
                        placeholder='Url para upload do android'
                        handleChange={handleChange}


                    />
                </div>
                <div className="col-lg-2">

                    <Input
                        label='Apk ou Abb'
                        name='extensionAndroid'
                        value={client.extensionAndroid || ''}
                        placeholder='Extensão'
                        handleChange={handleChange}

                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-10">

                    <Input
                        label='IOS User'
                        name='iosUser'
                        value={client.iosUser || ''}
                        handleChange={handleChange}
                        placeholder='URL da Apple Store'

                    />
                </div>
                <div className="col-lg-2">

                    <Input
                        label='User Tag'
                        name='versionIosUser'
                        value={client.versionIosUser || ''}
                        handleChange={handleChange}
                        placeholder='Versão'

                    />
                </div>
            </div>
            <Select
                label="Status"
                name="status"
                handleChange={handleChange}
                value={client.status || ''}

            />
            {sendData &&
                <button type="submit" className="btn btn-primary btn-block" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only"> Carregando...</span>
                </button>
            }
            {!sendData &&
                <button type="submit" className="btn btn-primary btn-block">
                    {client.id ? 'Atualizar' : 'Cadastrar'}
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