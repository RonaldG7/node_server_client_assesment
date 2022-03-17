import React, {useContext, useRef, useState} from 'react';
import "./login.css"
import {useNavigate} from "react-router-dom";
import http from "../../plugins/http";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import mainContext from "../../context/mainContext";

const Login = () => {

    const {setAdmin} = useContext(mainContext)
    const [status, setStatus] = useState(null)
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    })
    const [checked, setChecked] = useState(false)

    const nav = useNavigate()
    const username = useRef()
    const password = useRef()

    function handleLogin() {
        const user = {
            username: username.current.value,
            password: password.current.value,
            checked
        }
        http.post("/login", user).then(res => {
            if (res.success) {
                nav("/main")
                if (res.admin) {
                    setAdmin(true)
                }
            } else {
                setStatus(res.message)
            }
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked)
    }

    return (
        <div className="login d-flex j-center a-center">
            <div className="formLogin d-flex column a-center">
                <h3>Login</h3>
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
                    <div>
                        <TextField
                            inputRef={username}
                            id="outlined-textarea-username"
                            label="Enter Username"
                            placeholder="Username"
                            multiline
                        />
                    </div>
                    <div className="d-flex column">
                        <FormControl sx={{m: 1, width: '40ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                inputRef={password}
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                </Box>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        checked={checked}
                        onChange={handleChangeCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Stay logged in" />
                </FormGroup>
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
                {status && <p className="status">{status}</p>}
            </div>
        </div>
    );
};

export default Login;