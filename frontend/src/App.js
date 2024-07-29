import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthHome from './components/AuthHome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminHome from './components/AdminHome';
import ChildrenHome from './components/ChildrenHome'; // Import ChildrenHome
import MotherHome from './components/MotherHome'; // Import MotherHome
import Attendance from './components/Attendance';
import Nutrition from './components/Nutrition';
import ViewChildren from './components/ViewChildren';
import ViewMothers from './components/ViewMothers';
import PolioDetails from './components/PolioDetails';
import TimeTable from './components/TimeTable';
import ChildRequests from './components/ChildRequests';
import MyAttendance from './components/MyAttendance';
import ChildProfile from './components/ChildProfile';
import MotherProfile from './components/MotherProfile';
import Vaccines from './components/Vaccines'; // Import Vaccines
import RequestVaccine from './components/RequestVaccine'; // Import the new component



function App() {
  const appStyle = {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
  };

  const backgroundStyle = {
    backgroundImage: 'url(/images/anganwadi.jpg)', // Correct path to the image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.5,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflowY: 'auto', // Ensure content is scrollable
  };

  return (
    <div style={appStyle}>
      <div style={backgroundStyle}></div>
      <div style={contentStyle}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthHome />} />
            <Route path="/login/:type" element={<Login />} />
            <Route path="/signup/:type" element={<SignUp />} />
            <Route path="/admin" element={<AdminHome />}>
              <Route index element={<Navigate to="/admin/view-children" />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="nutrition" element={<Nutrition />} />
              <Route path="view-children" element={<ViewChildren />} />
              <Route path="view-mothers" element={<ViewMothers />} />
              <Route path="polio-details" element={<PolioDetails />} />
              <Route path="timetable" element={<TimeTable />} />
              <Route path="child-requests" element={<ChildRequests />} />
              <Route path="vaccines" element={<Vaccines />} /> 
            </Route>
            <Route path="/children" element={<ChildrenHome />}>
              <Route index element={<MyAttendance />} />
              <Route path="attendance" element={<MyAttendance />} />
              <Route path="timetable" element={<TimeTable />} />
              <Route path="profile" element={<ChildProfile />} />
              <Route path="request-vaccine" element={<RequestVaccine />} /> 
            </Route>
            <Route path="/mother" element={<MotherHome />}>
              <Route index element={<Nutrition />} />
              <Route path="nutritions" element={<Nutrition />} />
              <Route path="timetable" element={<TimeTable />} />
              <Route path="profile" element={<MotherProfile />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
