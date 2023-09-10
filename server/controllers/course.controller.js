const Course = require('../models/course.model');
const multer = require ('multer');
const upload = require('../config/multer.config');

module.exports = {
    createCourse: (req, res) => {
        upload.single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(400).json({ error: 'Multer error: ' + err.message });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(400).json({ error: 'Unknown error: ' + err.message });
            }
    
            const { name, location, numberOfHoles, par, description } = req.body;
    
            const imagePath = req.file ? req.file.filename : null;
    
            Course.create({
                name,
                location,
                numberOfHoles,
                par,
                description,
                image: imagePath, 
            })
            .then(newCourse => res.json(newCourse))
            .catch(err => res.status(400).json({ error: err.message }));
        });
    },
    

    getAllCourses: (req, res) => {
        Course.find({})
            .then(courses => res.json(courses))
            .catch(err => res.status(400).json({ error: err.message }));
    },

    getOneCourse: (req, res) => {
        Course.findOne({ _id: req.params.id })
            .then(course => res.json(course))
            .catch(err => res.status(400).json({ error: err.message }));
    },

    updateCourse: (req, res) => {
        Course.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(updatedCourse => res.json(updatedCourse))
            .catch(err => res.status(400).json({ error: err.message }));
    },

    deleteCourse: (req, res) => {
        Course.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.status(400).json({ error: err.message }));
    },
};
