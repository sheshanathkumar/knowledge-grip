import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { User } from '../component/data'
import { FaHouseUser, FaRegIdBadge, } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


export default function Question() {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [tag, setTag] = useState("");
    const [author, setAuthor] = useState("");

    const [show, setShow] = useState(false);
    const [response, setResponse] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const question = {
        "qTitle": title,
        "qDesc": descr,
        "tag": tag,
        "qAuthor": author,
        "qUpvote": 0,
        "qDownvote": 0,
        "replies": []
    }

    const submitQuestion = () => {
        console.log(question);

        fetch('http://localhost:9000/add-question', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(question)
        }).then( (res) => res.json())
        .then( (data) => {
            console.log(data.payload)
            setResponse(data.payload);
            setShow(true);
        })
        .catch((err) => {
            console.log(err)
            setResponse(err.message);
            setShow(true)
        });

        navigate("/");
    }


    return (
        <>
            <div className='container' >
                < Navbar page='ask-question-page' />
                <div className='row my-3' >
                    <div className='col'>

                        <div className='user-profile' >
                            <img src={User.image} className="img-thumbnail" alt="..."></img>
                            <h5> <FaHouseUser /> {User.name} </h5>
                            <h5> <GiSkills /> {User.skill} </h5>
                            <h5><FaRegIdBadge /> {User.reputation} </h5>
                        </div>

                    </div>
                    <div className='col-9' style={{ overflow: "scroll", height: "90vh" }}>
                        <h3 style={{ color: "#5808c2" }} >Post your question here...</h3>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="questionTitle"
                                placeholder='Question Title'
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Title</label>
                        </div>

                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here"
                                id="questionDesc" style={{ height: "200px" }}
                                value={descr} onChange={(e) => setDescr(e.target.value)}
                            ></textarea>
                            <label htmlFor="floatingTextarea2">Describe your question</label>
                        </div>

                        <h6 className='my-2'>add tags to the question, put tags in comma saperated format</h6>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">tag</span>
                            <input type="text" className="form-control"
                                placeholder="for example: Java, docker, micro-service, Node" aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={tag} onChange={(e) => setTag(e.target.value)}
                            />
                        </div>

                        <div className="input-group d-flex " >
                            <input type="text" className="form-control" id="name"
                                placeholder='Your Name' value={author} onChange={(e) => setAuthor(e.target.value)} />
                            <button type="button" className="btn btn-warning"
                                onClick={() => submitQuestion()}

                            >Submit</button>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            
                            <Modal.Body>{response}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                
                            </Modal.Footer>
                        </Modal>

                    </div>


                </div></div>
        </>


    )
}
