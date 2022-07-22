import Link from "next/link"
import { useRouter } from "next/router"
export function Navbar() {

    function textNavbar() {

        const { project } = useRouter().query
        if (project === 'servicos') {
            return 'Codificar - Serviços'
        }

        if(project === 'marketplace'){
            return 'Codificar - Marketplace'
        }
        return 'Codificar'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <div className="container-fluid">
                <Link href='/'>
                    <a className="navbar-brand text-white">
                        {textNavbar()}
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
                                <Link href='/issues/marketplace'>
                                    <a className="dropdown-item">Marketplace</a>
                                </Link>
                                <Link href='/issues/servicos'>
                                    <a className="dropdown-item">Serviços</a>
                                </Link>

                            </div>
                        </li>
                        <li className="nav-item">
                            <Link href='/projetos'>
                                <a className="nav-link text-white">Projetos</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/configuracoes'>
                                <a className="nav-link text-white">Configurações</a>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}