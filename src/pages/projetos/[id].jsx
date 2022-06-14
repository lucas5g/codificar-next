import Head from "next/head";
import { useRouter } from "next/router";
import { Spinner } from "../../components/Spinner";
import { TextCenter } from "../../components/TextCenter";
import { useFetch } from "../../hooks/useFetch";

export default function ProjectForm() {

    const { data: project, error } = useFetch(`/projetos/${useRouter().query.id}`)

    if (error) {
        return (
            <TextCenter text="Erro ao conectar com o servidor :(" height="80vh" />

        )
    }

    if (!project) {
        return (
            <>
                <Head>
                    <title>Cods | Projetos &gt; Editar</title>
                </Head>
                <Spinner />
            </>
        )

    }


    return (
        <div className="container-fluid mt-5">
            <Head>
                <title>Cods | Projetos &gt; Editar</title>
            </Head>
            <h1>Editar Projeto {project.name}</h1>

            <hr />
            <div className="row">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}