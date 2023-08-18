import React from 'react'
import Navbar from './navbar'
import { rawData, questions, User } from '../component/data'

import { FaArrowDown, FaArrowUp, FaHouseUser, FaPen, FaRegIdBadge, FaStopwatch } from 'react-icons/fa'
import { FcDislike, FcLike } from 'react-icons/fc'
import { GiSkills } from 'react-icons/gi'

export default function Dashboard() {

    return (
        <>
            <div className='container' >
                <Navbar />
                <div className='row' >

                    <div className='col'>

                        <div className='user-profile' >
                            <img src={User.image} class="img-thumbnail" alt="..."></img>
                            <h5> <FaHouseUser /> {User.name} </h5>
                            <h5> <GiSkills /> {User.skill} </h5>
                            <h5><FaRegIdBadge /> {User.reputation} </h5>
                        </div>

                    </div>
                    <div className='col-6' style={{ overflow: "scroll", height: "90vh" }}>


                        {rawData.map((question) => {
                            return <div className='grip' key={question.qid} >

                                <div className='grip-question'>
                                    <div className='ques-title'>
                                        <h5 >{question.qtitle}</h5>
                                    </div>
                                    <div className='ques-desc'>
                                        <h6>{question.qdesc}</h6>
                                    </div>

                                    <div className='grip-question-prop d-flex'>
                                        <p> <FaArrowUp />  {question.qupvote} </p>
                                        <p> <FaArrowDown /> {question.qdownvote} </p>
                                        <p> <FaPen /> {question.qauthor} </p>
                                        <p> <FaStopwatch /> {question.qtime}</p>
                                    </div>
                                </div>

                                {question.replies.map((rep) => {
                                    return < div className='grip-replies d-flex' key={rep.replyId}>


                                        <div className='grip-replies-props'>
                                            <p> <FcLike /> {rep.replyLike}</p>
                                            <p> <FcDislike /> {rep.replyDislike}</p>
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
                                })}
                                <p style={{ color: "blue" }}>..Add Your Reply</p>
                            </div>

                        })}


                    </div>

                    <div className='col'>
                        <h3>Top Questions</h3>
                        {questions.map(que => {
                            return <>
                                <p style={{ color: "blue" }}>{que}</p></>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
