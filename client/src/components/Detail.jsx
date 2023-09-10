import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Detail = (props) => {
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/courses/' + id)
            .then((res) => {
                setCourse(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteHandle = () => {
        axios.delete('http://localhost:8000/api/courses/' + id)
            .then((res) => {
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-success display-3">LinkShare</h1>
            <h2>Details about {course.name}</h2>
            <Link to={'/dashboard'} className="btn btn-success">Back to Dashboard</Link>

            <button className='btn btn-dark deleteButton' onClick={deleteHandle}>Delete {course.name}</button>
            
            <div className='details mt-4 mx-auto p-3 border border-dark' style={{ width: '80%', maxWidth: '600px' }}>
                <div className="mb-3">
                    <h3>Course Name:</h3>
                    <div className="border border-dark p-2">{course.name}</div>
                </div>
                <div className="mb-3">
                    <h3>Location:</h3>
                    <div className="border border-dark p-2">{course.location}</div>
                </div>
                <div className="mb-3">
                    <h3>Number of Holes:</h3>
                    <div className="border border-dark p-2">{course.numberOfHoles}</div>
                </div>
                <div className="mb-3">
                    <h3>Par:</h3>
                    <div className="border border-dark p-2">{course.par}</div>
                </div>
                <div className="mb-3">
                    <h3>Description:</h3>
                    <div className="border border-dark p-2">{course.description}</div>
                </div>
                
                {/* Display the uploaded image */}
                {course.image && (
                    <div className="mb-3">
                        <h3>Image:</h3>
                        <img src={`http://localhost:8000/uploads/${course.image}`} alt={course.name} style={{ width: '100%' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Detail;
