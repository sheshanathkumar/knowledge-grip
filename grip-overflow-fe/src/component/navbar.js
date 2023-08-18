import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h3 className="navbar-brand">Knowledge Grip</h3>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <h4 className="nav-link active" aria-current="page">Dashboard</h4>
                            </li>
                            
                            <li className="nav-item">
                                <h4 className="nav-link">User</h4>
                            </li>
                            
                        </ul>
                    </div>
                    <form className="d-flex"  style={ {width: "50%"}} >
                        <input className="form-control me-2"type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <button type="button" class="btn btn-primary mx-3">Ask A Question</button>
                </div>
            </nav>
        </>
    )
}
