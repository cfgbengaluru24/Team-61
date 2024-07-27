import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './Components/Login'
import './App.css'
import Test from './Components/Test'

import StudentDashboard from './Components/StudentDashboard'
import LoginDashboard from './Components/LoginDashboard';

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
    path : '/Test',
    element: <Test/>
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
