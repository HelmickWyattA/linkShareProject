import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const CourseForm = (props) => {
    const { courses, setCourses } = props;
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [numberOfHoles, setNumberofHoles] = useState("");
    const [par, setPar] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        name: "",
        location: "",
        numberOfHoles: "",
        par: "",
        description: "",
    });

    const logoutHandle = () => {
        axios
            .post("http://localhost:8000/api/logout")
            .then((res) => {
                console.log("Logged out successfully");
            })
            .catch((err) => {
                console.error("Logout failed:", err);
            });
    };

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const validateInputs = () => {
        let isValid = true;
        const updatedErrors = {
            name: "",
            location: "",
            numberOfHoles: "",
            par: "",
            description: "",
        };

        if (name.length < 3) {
            updatedErrors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (location.length < 3) {
            updatedErrors.location = "Location must be at least 3 characters";
            isValid = false;
        }

        if (numberOfHoles.length < 1) {
            updatedErrors.numberOfHoles = "Must Enter a quantity for the number of holes";
            isValid = false;
        }

        if (par.length < 1) {
            updatedErrors.par = "Must Enter a quantity for par";
            isValid = false;
        }

        if (description.length < 3) {
            updatedErrors.description = "Description must be at least 3 characters";
            isValid = false;
        }

        setErrors(updatedErrors);
        return isValid;
    };

    const submitHandle = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("location", location);
            formData.append("numberOfHoles", numberOfHoles);
            formData.append("par", par);
            formData.append("description", description);
            formData.append("image", image);

            try {
                const response = await axios.post(
                    "http://localhost:8000/api/courses/",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log(response.data);
                setCourses([...courses, response.data]);
                navigate("/dashboard");

                setName("");
                setLocation("");
                setNumberofHoles("");
                setPar("");
                setDescription("");
                setImage(null);
                setErrors({
                    name: "",
                    location: "",
                    numberOfHoles: "",
                    par: "",
                    description: "",
                    image: ""
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center text-success display-3">LinkShare</h1>
                    <h2 className="text-center text-secondary mb-3">Tell us where you hit the links</h2>
                    <Link to={"/dashboard"} className="d-block text-center text-success mb-3">Back to Dashboard</Link>

                    <div className="card mt-4 border-success">
                        <div className="card-body">
                            <form onSubmit={submitHandle} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        name="name"
                                        type="text"
                                        className={`form-control ${errors.name && "is-invalid"}`}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location:</label>
                                    <input
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location}
                                        name="location"
                                        type="text"
                                        className={`form-control ${errors.location && "is-invalid"}`}
                                    />
                                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="numberOfHoles" className="form-label">Number of Holes:</label>
                                    <input
                                        onChange={(e) => setNumberofHoles(e.target.value)}
                                        value={numberOfHoles}
                                        name="numberOfHoles"
                                        type="number"
                                        className={`form-control ${errors.numberOfHoles && "is-invalid"}`}
                                    />
                                    {errors.numberOfHoles && <div className="invalid-feedback">{errors.numberOfHoles}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="par" className="form-label">Par:</label>
                                    <input
                                        onChange={(e) => setPar(e.target.value)}
                                        value={par}
                                        name="par"
                                        type="number"
                                        className={`form-control ${errors.par && "is-invalid"}`}
                                    />
                                    {errors.par && <div className="invalid-feedback">{errors.par}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description:</label>
                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        name="description"
                                        type="text"
                                        className={`form-control ${errors.description && "is-invalid"}`}
                                    />
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image:</label>
                                    <input
                                        onChange={handleImageChange}
                                        name="image"
                                        type="file"
                                        className="form-control"
                                    />
                                </div>

                                {image && (
                                    <div className="mb-3">
                                        <label>Image Preview:</label>
                                        <img src={URL.createObjectURL(image)} alt="Course Image" className="img-fluid" />
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success">Share Course</button>
                                    <button onClick={logoutHandle} className="btn btn-secondary">Logout</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;
