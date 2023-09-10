const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Course must have a name!"],
        minlength: [3, "Course name must be at least THREE characters"]
    },
    location: {
        type: String,
        required: [true, "Course must have a location"],
        minlength: [3, "Course location must be at least THREE characters!"]
    },
    numberOfHoles: {
        type: Number,
        required: [true, "Please let us know how many holes this course has"]
    },
    par: {
        type: Number,
        required: [true, "Please let us know the par for this course"]
    },
    description: {
        type: String,
        required: [true, "Please leave a brief description of your course"],
        minlength: [3, "Course description must be at least THREE characters!"]
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
