const CourseController = require('../controllers/course.controller');
module.exports = (app) => {
    app.post('/api/courses', CourseController.createCourse); 
    app.get('/api/courses', CourseController.getAllCourses);
    app.get('/api/courses/:id', CourseController.getOneCourse);
    app.patch('/api/courses/:id', CourseController.updateCourse);
    app.delete('/api/courses/:id', CourseController.deleteCourse);


}


