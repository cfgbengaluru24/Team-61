import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './Components/Login'
import './App.css'
import Test from './Components/Test'
import InstructionPage from './Components/TestInstruction';
import StudentDashboard from './Components/StudentDashboard'
import LoginDashboard from './Components/LoginDashboard';
import MentorStudentMapping from './Components/MentorStudentMapping';

import './Components/Test.css'
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginDashboard />
  }, {
    path: '/loginpage',
    element: <LoginPage />
  },
  {
    path: '/studentpage',
    element: <StudentDashboard />
  },
  {
    path : '/TestInstruction',
    element: <InstructionPage/>
  },
  {
    path : 'Test',
    element: <Test/>
  },
  {
    path: '/mentor-student-mapping',
    element: <MentorStudentMapping />
  }
]);

function App() {



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
