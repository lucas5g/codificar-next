import axios from 'axios'
export default function projectos({ projects }) {
    return (
        <div className="container mt-5">
            <h1>Projetos</h1>
            <hr />

            <div className="row mt-5 d-flex justify-content-center ">
                <div className="col-lg-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Portal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, index) => (
                                <tr key={project.name}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>
                                        <a href={project.url}
                                            target="_blank"
                                            // rel="noopener noreferrer"
                                            className='btn btn-outline-success'
                                            >
                                            {project.version}
                                        </a>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {

    const { data } = await axios.get('http://version.aplicativoderestaurante.com.br:8080/projects')

    // console.log(data)

    return {
        props: {
            projects: data

        },


    }
}