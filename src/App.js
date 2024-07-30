import './App.css'
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Components/login/Login.jsx';
import Home from './Components/Home.jsx';
import SigningUp from './Components/SignUp/SigningUp.jsx';
import Main from './Components/main/Main.jsx';
import Start from './start/Start.jsx';
import Feedback from './Components/feedback/Feedback.jsx';
import BookAppointment from './Components/BookAppointment.jsx';


const App = () => {
    // const cookies = new Cookies();
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SigningUp/>} />
                <Route path="/main" element={<Main/>} />
                <Route path="/" element={<Start/>} />
                <Route path="/feedback" element={<Feedback/>} />
                <Route path="/BookAppointment" element={<BookAppointment/>} />
                {/* Add other routes */}
            </Routes>
        </Router>
    );
};

export default App;
