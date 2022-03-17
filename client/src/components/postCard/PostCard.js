import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "./postCard.css";
import http from "../../plugins/http";
import Button from "@mui/material/Button";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import moment from "moment";
import mainContext from "../../context/mainContext";

const PostCard = () => {

    const {admin} = useContext(mainContext)
    const [post, setPost] = useState(null)
    const [value, onChange] = useState([new Date(), new Date()])
    const [showModal, setShowModal] = useState(false)
    const [status, setStatus] = useState(null)
    const {_id} = useParams()

    useEffect(() => {
        http.get("/getPostCard/"+_id).then(res => {
            if (res.success) {
                setPost(res.post)
            }
        })
    }, [])

    function addBooking () {
        const info = {
            postId: _id,
            date: value
        }
        http.post("/hotelBooking", info).then(res => {
            if (res.success) {
                setPost(res.post)
                setShowModal(false)
                setStatus(null)
            } else {
                setStatus(res.message)
            }
        })
    }

    function tileDisabled ({activeStartDate, date, view }) {
        const someDate = moment(date).format("YYYY-MM-DD")
        return post?.bookings.includes(someDate)
    }

    return (
        <div>
            {post && <div className="d-flex card">
                <img src={post.images[0]} alt=""/>
                <div>
                    <h1>Name: {post.name}</h1>
                    <h2>City: {post.city}</h2>
                    <h2>${post.price}</h2>
                    <div className="description">
                        <p><b>Description:</b> {post.description}</p>
                    </div>
                    {!admin && <Button onClick={() => setShowModal(!showModal)} variant="outlined">Make Reservation</Button>}
                    {showModal && <div>
                        <DateRangePicker tileDisabled={tileDisabled} onChange={onChange} value={value}/>
                        <Button onClick={addBooking} variant="outlined">Confirm</Button>
                        {status && <p style={{color: "red"}}>{status}</p>}
                    </div>}
                </div>
            </div>}
            <div className="calendar">
                <Calendar tileDisabled={tileDisabled} />
            </div>

        </div>
    );
};

export default PostCard;