import axios from 'axios'
export default function projectos({ projects, lastTagWeb }) {
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
                            {/* {console.log({lastTagWeb})}
                            {console.log('project', projects[1].version)} */}
                            {projects.map((project, index) => (
                                <tr key={project.name}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>
                                        <a href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${project.version === lastTagWeb ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
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

    const { data:projects } = await axios.get('http://version.aplicativoderestaurante.com.br:8080/projects')
    const { data } = await axios.get(process.env.NEXT_PUBLIC_GITLAB_URL_TAG, {
        headers:{
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_KEY}`
        }
    })

    return {
        props: {
            projects,
            lastTagWeb: data[0].name

        },


    }
}