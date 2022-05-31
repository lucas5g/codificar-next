import axios from 'axios'
import { useEffect, useState } from 'react'
export default function Projects({ projects, lastTagWeb, lastTagReact }) {

   const [test, setTest] = useState('qwe')
    useEffect(() => {

        (async() => {
            const {data: test} = await axios.get('http://version.aplicativoderestaurante.com.br:8080/projects')
            console.log({ test})
            setTest(test)

        })()
    }, [])
    return (
        <div className="container mt-5 mb-3">
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
                                <th scope="col">IOS</th>
                                
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
                                        <a href={project.portal}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${project.versionWeb === lastTagWeb ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                            >
                                            {project.versionWeb}
                                        </a>

                                    </td>
                                    <td>
                                        <a href={project.ios}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn 
                                                ${project.versionIos === lastTagReact ? 'btn-outline-success' : 'btn-outline-danger'}
                                            `}
                                            >
                                            {project.versionIos}
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
    const { data: react } = await axios.get('https://git.codificar.com.br/api/v4/projects/238/repository/tags', {
        headers:{
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_KEY}`
        }
    })
    // console.log(react[0].name)

    return {
        props: {
            projects,
            lastTagWeb: data[0].name,
            lastTagReact: react[0].name
        },
    }
}