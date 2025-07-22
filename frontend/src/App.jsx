import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Start from './pages/Start';
import Home from './pages/Home';
import UserProfile from './pages/UserProfilePage';
import MyProfile from './pages/MyProfilePage';
import MultiStepForm from './pages/MultiStepForm';
import MySkills from './pages/MySkillsPage';
import { useUserContext } from './store/UserContext';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner';

const App = () => {
  const { isLoggedIn, loading } = useUserContext();

  if (loading) return <Spinner />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Start isloggedin={isLoggedIn()} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/multi-step-form" element={<MultiStepForm />} />
      <Route path="/user-profile/:id" element={<UserProfile />} />

      {/* Protected Routes */}
      <Route path="/home" element={
        <PrivateRoute><Home /></PrivateRoute>
      } />
      <Route path="/my-profile" element={
        <PrivateRoute><MyProfile /></PrivateRoute>
      } />
      <Route path="/my-skills" element={
        <PrivateRoute><MySkills /></PrivateRoute>
      } />
    </Routes>
  );
};

export default App;
