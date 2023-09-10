import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const RegisterForm = ({ errors, setErrors }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const formHandle = e => {
        e.preventDefault();
        const newUser = {
            userName, email, password, confirmPassword
        }
        axios.post("http://localhost:8000/api/register", newUser, { withCredentials: true })
            .then(res => navigate("/dashboard"))
            .catch(err => {
                console.log(err);
                setErrors([...errors, "Invalid Registration credentials"])
            })
    }

    return (
        <form onSubmit={formHandle}>
            <h3 className="bg-success text-white p-2 rounded">Register</h3>
            <div className="mb-3">
                <label htmlFor="userName" className="form-label">User Name:</label>
                <input type="text" className="form-control" name="userName" value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="text" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" className="form-control" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success">Register</button>
        </form>
    )
}

export default RegisterForm;
