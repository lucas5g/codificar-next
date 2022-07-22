import Head from "next/head";
import { Input } from "../components/Input";

export default function Settings() {
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
                                <th scope="col">Id</th>
                                <th scope="col">QA</th>
                            </tr>

                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6 mt-2">
                    <Form

                    />
                </div>
            </div>
        </div>
    )
}


function Form() {

    return (
        <form>
            <Input


            />
        </form>
    )
}