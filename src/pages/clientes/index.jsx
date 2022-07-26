import Head from 'next/head'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spinner } from '../../components/Spinner'
import { TextCenter } from '../../components/TextCenter'
import { useFetch } from '../../hooks/useFetch'

export default function Project() {

    const {project} = useRouter().query
    const { data, error } = useFetch(`/clientes?project=${project}`)

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

    const {clients , lastTagUser, lastTagProvider, lastTagWeb} = data
    console.log({lastTagUser, lastTagProvider})

    return (
        <div className="container-fluid mt-5 mb-3">
            <Head>
                <title>Cods | Clientes</title>
            </Head>
            <div className="d-flex justify-content-between ">

                <h1>
                    Clientes &gt; {project}
                </h1>
                <div>
                    <Link href={`/clientes/editar?project=${project}`}>
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

                            {clients?.filter(client =>  client.status).map((client, index) => (

                                <tr key={client.id}>

                                    <th scope="row">{index + 1}</th>
                                    <td>{client.name}</td>
                                    <td>
                                        <a href={client.portal}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${client.versionWeb === lastTagWeb ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                        >
                                            {client.versionWeb}
                                        </a>

                                    </td>
                                    <td>
                                        <a href={client.android}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${client.versionAndroid === lastTagUser ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                        >
                                            {client.versionAndroid}
                                        </a>

                                    </td>
                                    <td>
                                        <a href={client.ios}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${client.versionIos === lastTagUser ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                        >
                                            {client.versionIos}
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


