import Link from "next/link"
import { useFetch } from "../hooks/useFetch"
export function Navbar() {

    const { data: projects, error } = useFetch('/projetos')

    useFetch('/issues/marketplace')
    useFetch('/issues/servicos')

    useFetch('/clientes/?project=marketplace')
    


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <div className="container-fluid">
                <Link href='/'>
                    <a className="navbar-brand text-white">
                        Navbar
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link text-white active" aria-current="page">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Issues
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                {projects?.map(project => (
                                    <Link
                                        key={project.id}
                                        href={`/issues/${project.slug}`}
                                    >
                                        <a className="dropdown-item">{project.name}</a>
                                    </Link>
                                ))}
                            </div>

                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Clientes
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                {projects?.map(project => (
                                    <Link
                                        key={project.id}
                                        href={`/clientes?project=${project.slug}`}
                                    >
                                        <a className="dropdown-item">{project.name}</a>
                                    </Link>
                                ))}
                            </div>

                        </li>
                        <li className="nav-item">
                            <Link href='/projetos'>
                                <a className="nav-link text-white">Projetos</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}