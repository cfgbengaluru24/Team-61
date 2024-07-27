import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import LoginPage from './Components/Login'
import './App.css'

const router=createBrowserRouter([
  {
    path:'/',
    element:<LoginPage/>
  }
]);

function App() {

  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
