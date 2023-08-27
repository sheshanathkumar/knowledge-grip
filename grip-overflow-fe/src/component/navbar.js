import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Question from './question';

export default function Navbar(prop) {

    console.log(prop)
    return (
        <>
            
                <nav className="navbar navbar-expand " style={{ background: '#e6f2ff' }}>
                    <div className="container-fluid" >
                        <h3 className="navbar-brand">Knowledge Grip</h3>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav" style={{ gap: '15px' }}>
                                <li className="nav-item nav-style">
                                    <Link to="/" style={{ textDecoration: 'none' }} >
                                        <h4 className="nav-link active " >Dashboard</h4>
                                    </Link>
                                </li>

                                <li className="nav-item nav-style">
                                    <h4 className="nav-link active">User</h4>
                                </li>

                            </ul>
                        </div>
                        <form className="d-flex" style={{ width: "50%" }} >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        {(prop.page !== 'ask-question-page') ?
                            <Link to='/question'> <button type="button" className="btn btn-primary mx-3" >  Ask A Question
                            </button> </Link> :
                            ""}
                    </div>
                </nav>
            
        </>
    )
}
