// App.js
import React, {useContext} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EmailConfirmation from './components/UserConfirmation';
import AdminStudents from './components/AdminStudents';
import AdminDashboard from './components/AdminDashboard';
import AdminCohorts from './components/AdminCohorts';
import AdminTeachers from './components/AdminTeachers'
import NewCohort from './Pages/NewCohort';
import Verify from './Pages/Verify';
import LandingPage from './Pages/Landing';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NewHome from './Pages/philHome';
import EditCohort from './components/EditCohort';
import CohortFiles from './components/CohortFiles';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import DiscussionBoard from './components/DiscussionBoard';
import Post from './components/Post';



const App = () => {
  const { currentUser, setIsLoggedIn } = useContext(AuthContext);
  //localStorage.clear()
 
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const SuperAdminRoute = ({ children }) => {
    if(currentUser.role !== 'SuperAdmin'){
      return <Navigate to="/login"/>;
    }
    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route path="admindashboard" element={<SuperAdminRoute> <AdminDashboard /> </SuperAdminRoute>}/>  
            <Route path="adminstudents" element={<SuperAdminRoute><AdminStudents /></SuperAdminRoute>}/>
            <Route path="adminsteachers" element={<SuperAdminRoute><AdminTeachers /></SuperAdminRoute>}/>
            <Route path="admincohorts" element={<SuperAdminRoute><AdminCohorts /></SuperAdminRoute>}/>
            <Route path="editCohort" element={<EditCohort />}/>
            <Route path="studentprofile" element={<StudentProfile />}/>
            <Route path="teacherprofile" element={<TeacherProfile />}/>
            <Route path="teacherprofile" element={<TeacherProfile />}/>
            <Route path="cohortfiles" element={<CohortFiles />}/>
            <Route path='discussionboard' element={<DiscussionBoard />}/> 
            <Route path='post' element={<Post />}/> 
          </Route>
          <Route path="landing" element={<LandingPage />} />
          <Route path='confirmation/:token' element={<EmailConfirmation />} />
          <Route path='verify' element={<ProtectedRoute><Verify /></ProtectedRoute>} />
          <Route path='newCohort' element={<ProtectedRoute><NewCohort /></ProtectedRoute>} />
          <Route path='philHome' element={<ProtectedRoute><NewHome /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
