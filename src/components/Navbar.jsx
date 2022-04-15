import Link from "next/link"
export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success mb-5">
            <div className="container-fluid">
                <Link href='/'>
                    <a className="navbar-brand text-white">
                        Codificar
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
                        <li className="nav-item">
                            <Link href='/issues'>
                                <a className="nav-link text-white">Issues</a>
                            </Link>
                        </li>

                        {/* <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li> */}
                    </ul>

                </div>
            </div>
        </nav>
    )
}