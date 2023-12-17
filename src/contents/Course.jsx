import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Course = () => {
    const { cid } = useParams(); // Get the course id from the URL
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Fetch the course details
        axios.get(`http://localhost:3001/getCourse/${cid}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(err => console.log(err));
    }, [cid]); // Dependency array

    // Render the course details
    return (
        <div>
            {course ? (
                <>
                    <h1>{course.name}</h1>
                    <p>{course.subject}</p>
                    <p>{course.hours} hours</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
