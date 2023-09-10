import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Main from './views/Main';
import Detail from './components/Detail';
import Update from './components/Update';
import CourseForm from './components/CourseForm';
import './App.css';
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const[errors, setErrors] = useState([]);
  const [courses, setCourses] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home errors={errors} setErrors={setErrors}/>} />
          <Route path='/dashboard' element={<Main/>} />
          <Route path='/courses/:id' element={<Detail />} />
          <Route path="/courses/edit/:id" element={<Update />} />
          <Route path='/courses/new' element={<CourseForm courses={courses} setCourses={setCourses} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
