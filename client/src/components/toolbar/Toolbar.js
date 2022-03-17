import React, {useContext} from 'react';
import "./toolbar.css"
import {useNavigate} from "react-router-dom";
import http from "../../plugins/http";
import Button from "@mui/material/Button";
import mainContext from "../../context/mainContext";

const Toolbar = () => {

    const {admin, setAdmin} = useContext(mainContext)
    const nav = useNavigate()

    function sendRequest () {
        http.get("/logout").then(res => {
            if (res.success) {
                setAdmin(false)
                nav("/")
            }
        })
    }

    return (
        <div className="toolbar">
            <Button onClick={() => nav("/main")}>All Posts</Button>
            {admin && <Button onClick={() => nav("/uploadPost")}>Upload Post</Button>}
            {!admin && <Button onClick={() => nav("/bookings")}>My Bookings</Button>}
            <Button onClick={sendRequest}>Logout</Button>
        </div>
    );
};

export default Toolbar;