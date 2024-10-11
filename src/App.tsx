import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Add from './Pages/Add';
import Edit from './Pages/Edit';
import View from './Pages/View';
import { firestore, auth } from './firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import NavBar from './Components/NavBar';

function App() {
  const handleLoginSubmit = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential) {
        window.location.href = '/view';
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onSubmit={handleLoginSubmit} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
