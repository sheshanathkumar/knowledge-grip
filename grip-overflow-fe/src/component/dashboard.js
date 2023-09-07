import React, { useEffect, useState, CSSProperties } from 'react'
import Navbar from './navbar'
import { questions, User } from '../component/data'
import { HashLoader, ClipLoader } from 'react-spinners'

import { FaArrowDown, FaArrowUp, FaHouseUser, FaPen, FaRegIdBadge, FaStopwatch } from 'react-icons/fa'
import { FcDislike, FcLike } from 'react-icons/fc'
import { GiSkills } from 'react-icons/gi'
import { Navigate, useNavigate } from 'react-router'

export default function Dashboard() {

    const navigate = useNavigate();
    const [rawData, setRawData] = useState(null);
    const [addReplyClick, setAddReplyClick] = useState(false);
    const [reply, setReply] = useState("");
    const [addReplyTo, setAddReplyTo] = useState('');
    const [author, setAuthor] = useState("");
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");
    const [questionUpvote, setQuestionUpvote] = useState();
    const [questionDownvote, setQuestionDownvote] = useState();
    const [replyLike, setReplyLike] = useState();
    const [replyDislike, setReplyDisLike] = useState();
    const [popup, setPopup]= useState(false)
    const [replyTime, setReplyTime] = useState("");

    
    const getCurrentTime = () => {
        let currDate = "" + new Date( Date.now() );
        let date = currDate.replace(' GMT+0530 (India Standard Time)', '');
        setReplyTime(date);
    }

    const override = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "red",
    };

    const toggleAddReply = (val) => {
        console.log(val)
        if (addReplyClick === 'set')
            setAddReplyClick('unset');
        else {
            setAddReplyClick('set')
            setAddReplyTo(val);
        }
    }

    const upvoteQuestion = (qid, upvote) => {
        console.log(qid, upvote);
        let url = `http://localhost:9000/${qid}/${upvote + 1}/upvote`;
        console.log(url)

        // fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // })
        // .then((res) => res.json)
        // .then((data) => {
        //     if (data.status === 200) {
        //         console.log(data.payload);
        //     }
        // });
        console.log(rawData)
        const currQuestion = rawData.find(x => x.id === qid)


        console.log(currQuestion);

    }

    const dowvoteQuestion = (qid, downvote) => {
        console.log(qid, downvote);
        let url = `http://localhost:9000/${qid}/${downvote + 1}/downvote`;
        console.log(url)

        fetch(url, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then((res) => res.json)
            .then((data) => {
                if (data.status === 200) {
                    console.log(data.payload);
                }
            });



    }

    const submitReply = (value) => {
        getCurrentTime();
        const replyObj = {
            "replyDesc": reply,
            "replyBy": author,
            "replyLike": 0,
            "replyDislike": 0,
            "replyTime": replyTime
        }
        let submitUrl = `http://localhost:9000/add-reply?question=${value}`;
        console.log(value + " " + JSON.stringify(replyObj) + " " + submitUrl)
        fetch(submitUrl, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(replyObj)
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err.message);
        })
        setAddReplyClick('unset')
        setAuthor('');
        setReply('');
        rawData.map(x => {
            if (x.id === value) {
                x.replyEntities.push(replyObj)
            }
        })

    }

    useEffect(() => {
        fetch('http://localhost:9000/all-question')
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setRawData(data.payload);
                }
            })
            .catch((err) => {
                navigate("/error500")
            }  )
    }, []);


    return (
        <>
            <Navbar page='dashboard-page' />

            {rawData ? <div className='container my-1 ' style={ {backgroundColor:'#f6f6ee'} }>

                <div className='row' >

                    {/* <div className='col'>

        <div className='user-profile' >
            <img src={User.image} className="img-thumbnail" alt="..."></img>
            <h5> <FaHouseUser /> {User.name} </h5>
            <h5> <GiSkills /> {User.skill} </h5>
            <h5><FaRegIdBadge /> {User.reputation} </h5>
        </div>

    </div> */}
                    <div className='col-9' style={{ overflow: "scroll", height: "90vh" }}>

                        {rawData.map((question) => {
                            return <div className='grip' key={question.id} >
                                <div className='grip-question'>
                                    <div className='ques-title'>
                                        <h5 >{question.title}</h5>
                                    </div>
                                    <div className='ques-desc'>
                                        <h6>{question.desc}</h6>
                                    </div>

                                    <div className='question-tag d-flex' >
                                        {question.tag.map(tag => {
                                            return <p>#{tag}</p>
                                        })}
                                    </div>

                                    <div className='grip-question-prop d-flex'>
                                        <p className='cursor-point' onClick={() => upvoteQuestion(question.id, question.upvote)}> <FaArrowUp />  {question.upvote} </p>
                                        <p className='cursor-point' onClick={() => dowvoteQuestion(question.id, question.downvote)}> <FaArrowDown /> {question.downvote} </p>
                                        <p> <FaPen /> {question.author} </p>
                                        <p> <FaStopwatch /> {question.time}</p>
                                    </div>
                                </div>

                                {(question.replyEntities != null) ? question.replyEntities.map((rep) => {
                                    return < div className='grip-replies d-flex' key={rep.replyId}>


                                        <div className='grip-replies-props'>
                                            <p className='cursor-point'> <FcLike /> {rep.replyLike}</p>
                                            <p className='cursor-point'> <FcDislike /> {rep.replyDislike}</p>
                                        </div>
                                        <div className='reply'>
                                            <div className='reply-desc'>
                                                <p>{rep.replyDesc} </p>
                                            </div>
                                            <div className='reply-props d-flex'>
                                                <span style={{ color: "blue" }} >{rep.replyBy}</span>
                                                <p> <FaStopwatch /> {rep.replyTime}</p>
                                            </div>
                                        </div>



                                    </div>
                                }) : ""}
                                <p style={{ color: "blue", width: 'max-content', cursor: 'pointer' }}
                                    onClick={() => toggleAddReply(question.id)}  >..Add Your Reply</p>

                                {(addReplyClick === 'set' && addReplyTo === question.id) ?
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Add your reply"
                                            id="replyDescr" style={{ height: "200px" }}
                                            value={reply} onChange={(e) => setReply(e.target.value)}
                                        ></textarea>
                                        <label htmlFor="floatingTextarea2">Reply</label>

                                        <div className="input-group d-flex my-2" >
                                            <input type="text" className="form-control" id="name"
                                                placeholder='Your Name' value={author} onChange={(e) => setAuthor(e.target.value)} />
                                            <button type="button" className="btn btn-warning"
                                                onClick={() => submitReply(question.id)}
                                            >  Submit
                                            </button>
                                        </div>

                                    </div>
                                    : ""}

                            </div>
                        })
                        }


                    </div>
                    {<div className='col-3' style={{ backgroundColor: "#f6f6ee", borderRadius: "5px" }}>
                        <h3>Top Questions</h3>
                        {rawData.map(que => {
                            return <>
                                <p style={{ color: "blue" }} >{que.title}</p></>
                        })}
                    </div>}

                </div>
            </div> : <HashLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />}
        </>
    )

}
