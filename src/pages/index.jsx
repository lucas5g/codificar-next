import {useFetch} from '../hooks/useFetch'
import Head from 'next/head'


export default function Home() {

    useFetch('/issues/marketplace')
    useFetch('/issues/servicos')
    
    // useFetch('/projetos')


    return (
        <div className='container-fluid mt-5'>
            <Head>
                <title>Cods | Home</title>
            </Head>
            <h1>Cods Helpers</h1>
            <hr />
            <h5>
                Aplicação para ajudar nas tarefas diárias.
            </h5>



        </div>

    )
}
