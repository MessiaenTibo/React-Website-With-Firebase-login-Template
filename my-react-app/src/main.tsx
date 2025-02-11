import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/main.css"
// Router
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// Routes
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
// Components
import Container from './components/Container';

const router = createBrowserRouter([
  {
    element: <Container />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
