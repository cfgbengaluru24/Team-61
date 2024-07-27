import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Components/Login'
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
