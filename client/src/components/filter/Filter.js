import {useRef, useState} from 'react';
import "./filter.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css"
import http from "../../plugins/http";

const Filter = ({setPosts}) => {

    const [value, onChange] = useState([new Date(), new Date()])
    const cityRef = useRef()
    const priceFromRef = useRef()
    const priceToRef = useRef()
    const dateRef = value

    function handleSearch () {
        const search = {
            city: cityRef.current.value,
            priceFrom: priceFromRef.current.value,
            priceTo: priceToRef.current.value,
            date: dateRef
        }
        http.post("/search", search).then(res => {
            if (res.success) {
                setPosts(res.posts)
            }
        })
    }

    return (
        <div className="d-flex">
            <TextField
                inputRef={cityRef}
                id="outlined-textarea"
                label="City"
                placeholder="City"
                multiline
            />
            <TextField
                inputRef={priceFromRef}
                id="outlined-textarea"
                label="Price from"
                placeholder="Price from"
                multiline
            />
            <TextField
                inputRef={priceToRef}
                id="outlined-textarea"
                label="Price to"
                placeholder="Price to"
                multiline
            />
            <DateRangePicker onChange={onChange} value={value}/>
            <Button onClick={handleSearch} variant="outlined">Search</Button>
        </div>
    );
};

export default Filter;