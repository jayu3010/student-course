import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StudentForm from './pages/studentForm';
import Fees from './pages/fees';
import Report from './pages/report';
import Home from './pages/home';
import StudentList from './pages/studentList';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/student-form' element={<StudentList />} />
        <Route path='/add-student' element={<StudentForm />} />
        <Route path='/edit-student/:id' element={<StudentForm />} />
        <Route path='/report' element={<Report />} />
        <Route path='/fees' element={<Fees />} />
      </Routes>
    </div>
  );
}

export default App;
