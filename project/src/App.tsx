import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import PhotoUploadPage from './pages/PhotoUploadPage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/questionnaire" element={<QuestionnairePage />} />
      <Route path="/photo-upload" element={<PhotoUploadPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;