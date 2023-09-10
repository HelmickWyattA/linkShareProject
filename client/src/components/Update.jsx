import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Update = (props) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [numberOfHoles, setNumberofHoles] = useState('');
    const [par, setPar] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/courses/' + id)
            .then((res) => {
                setName(res.data.name);
                setLocation(res.data.location);
                setNumberofHoles(res.data.numberOfHoles);
                setPar(res.data.par);
                setDescription(res.data.description);

                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const updateCourse = (e) => {
        e.preventDefault();
        axios
            .patch('http://localhost:8000/api/courses/' + id, {
                name: name,
                location: location,
                numberOfHoles: numberOfHoles,
                par: par,
                description: description,
            })
            .then((res) => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <h1 className="card-header text-success">Edit Course Information</h1>
                <div className="card-body">
                    <Link to={'/dashboard'} className="btn btn-success">
                        Back to Dashboard
                    </Link>
                    <form onSubmit={updateCourse} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">
                                Location:
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numberOfHoles" className="form-label">
                                Number of Holes:
                            </label>
                            <input
                                type="text"
                                name="numberOfHoles"
                                value={numberOfHoles}
                                onChange={(e) => {
                                    setNumberofHoles(e.target.value);
                                }}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="par" className="form-label">
                                Par:
                            </label>
                            <input
                                type="text"
                                name="par"
                                value={par}
                                onChange={(e) => {
                                    setPar(e.target.value);
                                }}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description:
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>

                        <button type="submit" className="btn btn-success">
                            Update Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
