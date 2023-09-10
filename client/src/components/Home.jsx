import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import 'bootstrap/dist/css/bootstrap.css';

const Home = ({ errors, setErrors }) => {
    return (
        <div className="container mt-5">
            <h1 className="text-center display-3 text-success">Welcome to LinkShare</h1>
            <div className="text-danger">
                {errors.map((err, idx) => <p key={idx}>{err}</p>)}
            </div>
            <div className="row justify-content-around">
                <div className="col-md-5 bg-secondary p-4 rounded">
                    <RegisterForm errors={errors} setErrors={setErrors} />
                </div>
                <div className="col-md-5 bg-secondary p-4 rounded">
                    <LoginForm errors={errors} setErrors={setErrors} />
                </div>
            </div>
        </div>
    )
}

export default Home;
