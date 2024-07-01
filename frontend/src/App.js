import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './css/App.css';
import Navigation from './components/navbar/Navigation';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Home from './pages/Home';
import { checkAuthStatus } from './api/axiosInstance';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLayout, setCurrentLayout] = useState([
    { i: 'chatList', x: 4, y: 1, w: 8, h: 6, maxW: 16, maxH: 9 },
    { i: 'chatBox', x: 4, y: 7, w: 8, h: 1, maxW: 16, maxH: 2 }
  ]);
  const originalLayoutRef = useRef(currentLayout);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkAuthStatus();
        setIsLoggedIn(response.valid);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(prevEditMode => !prevEditMode);
  };

  const saveLayout = (layout) => {
    originalLayoutRef.current = layout;
  };

  const restoreLayout = () => {
    setCurrentLayout(originalLayoutRef.current);
  };

  const handleSaveClick = () => {
    saveLayout(currentLayout);
    toggleEditMode();
  };

  const handleCancelClick = () => {
    restoreLayout();
    toggleEditMode();
  };

  return (
    <Router>
      <Navigation 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        toggleEditMode={toggleEditMode} 
        isEditMode={isEditMode} 
        handleSaveClick={handleSaveClick}
        handleCancelClick={handleCancelClick}
      />
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home 
                isLoggedIn={isLoggedIn} 
                isEditMode={isEditMode} 
                isChatPage={true}
                currentLayout={currentLayout}
                setCurrentLayout={setCurrentLayout}
              />} 
            />
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
            />
            <Route 
              path="/mypage" 
              element={isLoggedIn ? <MyPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/chat/:roomId" 
              element={isLoggedIn ? <Home 
                isLoggedIn={isLoggedIn} 
                isEditMode={isEditMode} 
                isChatPage={true}
                currentLayout={currentLayout}
                setCurrentLayout={setCurrentLayout}
              /> : <Navigate to="/login" />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
