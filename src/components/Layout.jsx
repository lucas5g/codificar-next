export default function Layout({ children }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-success mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">Codificar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <a className="nav-link text-white active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/issues">Issues</a>
                            </li>
                  
                            {/* <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li> */}
                        </ul>
                  
                    </div>
                </div>
            </nav>

            <main >
                {children}
            </main>


        </>
    )
}