import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NovelDetailPage from './pages/NovelDetailPage';
import ChapterReaderPage from './pages/ChapterReaderPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by verifying the token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/novel/:id" element={<NovelDetailPage />} />
                <Route path="/novel/:novelId/chapter/:chapterId" element={<ChapterReaderPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

