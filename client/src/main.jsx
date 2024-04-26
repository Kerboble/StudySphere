import React from 'react';
import { createRoot } from 'react-dom';
import App from './App.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { CohortContextProvider } from './context/cohortContext.jsx'; // Import the CohortContextProvider
import './style.scss';
import { StudentContextProvider } from './context/studentContext.jsx';
import { TeacherContextProvider } from './context/teacherContext.jsx';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CohortContextProvider> {/* Wrap the App component with CohortContextProvider */}
      <StudentContextProvider>
        <TeacherContextProvider>
          <App />
        </TeacherContextProvider>
      </StudentContextProvider>
      </CohortContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
