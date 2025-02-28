import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';
import Auth from './pages/Auth';
const App = () => {
    return (<Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Auth path="/login"/>}/>
        <Route path="/logout" element={<Auth path="/logout"/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>);
};
export default App;
