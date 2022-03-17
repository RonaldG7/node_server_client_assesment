import {useNavigate} from "react-router-dom"
import "./landingPage.css"
import Button from '@mui/material/Button';
import {useEffect} from "react";
import http from "../../plugins/http";

const LandingPageComp = () => {

    const nav = useNavigate()

    useEffect(() => {
        http.get("/loggedIn").then(res => {
            if (res.success) {
                nav("/main")
            }
        })
    })

    return (
        <div className="bgImg">
            <div className="loginBtnBox">
                <img className="logo" src="https://cubux.net/wp-content/uploads/2019/07/1280px-HomeAway_Logo.svg_.png" alt=""/>
                <div className="d-flex a-center">
                    <Button variant="contained" onClick={() => nav("/register")}>Register</Button>
                    <img className="or" src="https://pbs.twimg.com/profile_images/1155123589/or_400x400.png" alt=""/>
                    <Button variant="contained" onClick={() => nav("/login")}>Login</Button>
                </div>
            </div>
        </div>
    );
};

export default LandingPageComp;