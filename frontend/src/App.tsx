import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import Landing from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { Toaster } from 'sonner';
import { Home } from './pages/course/Home';
import Courses from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { UploadCourse } from './pages/admin/upload';
import MyCourses from './pages/students/MyCourses';
import Learning from './pages/students/Learning';
import AuthRequired from './components/authRequired'; 
import Unauthorized from './pages/Unauthorized';
import Footer from './components/Footer';
import HeaderTop from './components/HeaderTop';
import ContactUs from './pages/Contact';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import UsefulLink from './pages/UsefulLink';
import { Dashboard } from '@/pages/admin/DashBoard';
import GuestOnlyRoute from './components/GuestonlyRoute';
import Setting from './pages/admin/Setting';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import FeedBack from './pages/Feedback';


function App() {



  return (
    <div className="overflow-x-hidden p-3">
      <Toaster richColors />
     
      <Navbar />
      <HeaderTop />
      <ScrollToTop />
      <Routes>
        {/* Guest Only Routes */}
        <Route  element={<GuestOnlyRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About/>} />
        <Route path="/useful-links" element={<UsefulLink />} />


        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Admin Protected Routes */}
        <Route element={<AuthRequired allowedRole={5150} />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/admin/upload" element={<UploadCourse />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/feedback' element={<FeedBack />} />

        </Route>

        {/* Student Protected Routes */}
        <Route element={<AuthRequired allowedRole={2004} />}>
          <Route path="/student/my-courses" element={<MyCourses />} />
          <Route path="/student/my-courses/:id" element={<Learning />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/feedback' element={<FeedBack />} />

        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
