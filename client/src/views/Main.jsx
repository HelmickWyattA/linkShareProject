import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from '../components/CourseList';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Main = ({ errors, setErrors }) => {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/allUsers", { withCredentials: true })
            .then(res => setAllUsers(res.data))
            .catch(err => {
                setErrors([...errors, "User must be logged in to perform this task"]);
                navigate('/')
            })
    }, [])

    const [courses, setCourses] = useState([]);
    const removeFromDom = courseId => {
        setCourses(courses.filter(course => course._id !== courseId));
    }

    const logoutHandle = () => {
        axios
            .post("http://localhost:8000/api/logout")
            .then((res) => {
                console.log("Logged out successfully");
                navigate('/');
            })
            .catch((err) => {
                console.error("Logout failed:", err);
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-success display-3">LinkShare</h1>
            <h2 className="text-success mb-3">Courses</h2>
            <CourseList courses={courses} setCourses={setCourses} removeFromDom={removeFromDom} />
            <div className="d-flex justify-content-start mt-3">
                <Link to={"/courses/new"} className="btn btn-dark me-3">Share a course</Link>
                <button onClick={logoutHandle} className="btn btn-dark">Logout</button>
            </div>
        </div>
    );
}

export default Main;
