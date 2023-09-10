import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const CourseList = (props) => {
    const { courses, setCourses } = props;

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/courses")
            .then((res) => {
                console.log(res.data);
                setCourses(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='allCourses'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Number of Holes</th>
                        <th>Par</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id}>
                            <td><Link to={`/courses/${course._id}`}>{course.name}</Link></td>
                            <td>{course.location}</td>
                            <td>{course.numberOfHoles}</td>
                            <td>{course.par}</td>
                            <td>
                                <Link className="btn btn-success" to={`/courses/edit/${course._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
