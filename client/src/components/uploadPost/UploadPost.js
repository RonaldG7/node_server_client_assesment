import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../../plugins/http";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UploadPost = () => {

    const [status, setStatus] = useState(null)
    const [images, setImages] = useState([])

    const nav = useNavigate()
    const imagesRef = useRef()
    const nameRef = useRef()
    const descriptionRef = useRef()
    const cityRef = useRef()
    const priceRef = useRef()

    function uploadImage () {
        if (imagesRef.current.value.length !== 0) {
            setImages([...images, imagesRef.current.value])
        } else {
            setStatus("Enter image URL")
        }
    }

    function handleUpload() {
        const post = {
            images: images,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            city: cityRef.current.value,
            price: priceRef.current.value
        }
        http.post("/uploadPost", post).then(res => {
            if (res.success) {
                setStatus(null)
                setImages([])
            } else {
                setStatus(res.message)
            }
        })
    }

    return (
        <div className="register d-flex j-center a-center">
            <div className="form d-flex column a-center j-center">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {
                            m: 1, width: '40ch',
                            display: 'flex', flexWrap: 'wrap'
                        }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="d-flex a-center" style={{width: "325px"}}>
                        <TextField
                            inputRef={imagesRef}
                            id="outlined-textarea-username"
                            label="Photo URL"
                            placeholder="Photo URL"
                            multiline
                        />
                        <Button onClick={uploadImage} variant="outlined">Upload</Button>
                    </div>
                    <div>
                        <TextField
                            inputRef={nameRef}
                            id="outlined-textarea-email"
                            label="Name"
                            placeholder="Name"
                            multiline
                        />
                    </div>
                    <div>
                        <TextField
                            inputRef={descriptionRef}
                            id="outlined-textarea-email"
                            label="Description"
                            placeholder="Description"
                            multiline
                        />
                    </div>
                    <div>
                        <TextField
                            inputRef={cityRef}
                            id="outlined-textarea-email"
                            label="City"
                            placeholder="City"
                            multiline
                        />
                    </div>
                    <div>
                        <TextField
                            inputRef={priceRef}
                            id="outlined-number"
                            label="Price"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </Box>
                <div>
                    <Button variant="outlined" onClick={() => nav(-1)}>Go Back</Button>
                    <Button sx={{marginLeft: "10px"}} variant="outlined" onClick={handleUpload}>Submit</Button>
                </div>
                {status && <p className="status">{status}</p>}
            </div>
        </div>
    );
};

export default UploadPost;