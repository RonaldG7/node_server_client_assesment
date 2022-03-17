import {useEffect, useState} from 'react';
import Toolbar from "../components/toolbar/Toolbar";
import UserBookings from "../components/userBookings/UserBookings";
import http from "../plugins/http";

const BookingsPage = () => {

    const [booking, setBookings] = useState([])

    useEffect(() => {
        http.get("/getBookings").then(res => {
            setBookings(res.bookings)
        })
    },[])

    return (
        <div className="bgColor">
            <Toolbar/>
            {booking.map((x, i) => <UserBookings booking={x} key={i}/>)}
        </div>
    );
};

export default BookingsPage;