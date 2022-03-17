import "./userBookings.css"

const UserBookings = ({booking}) => {
    return (
        <div className="d-flex column">
            <div className="booking d-flex">
                <img src={booking.images[0]} alt=""/>
                <div>
                    <h3>{booking.name}</h3>
                    <h4>{booking.city}</h4>
                    <h4>${booking.price}</h4>
                </div>
                <div>
                    <p>Description: {booking.description}</p>
                </div>
            </div>
        </div>

    );
};

export default UserBookings;