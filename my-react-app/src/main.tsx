import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/main.css"
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Routes
import Home from './routes/Home';
import Register from './routes/auth/Register';
import Login from './routes/auth/Login';
import Verify from './routes/auth/Verify';
import PasswordReset from './routes/auth/PasswordReset';
import NotFound from './routes/NotFound';
// Components
import Protected from './components/Protected';
import Container from './components/Container';
import AuthContainer from './components/AuthContainer';

const router = createBrowserRouter([
  {
    element: <Protected>
      <Container />
    </Protected>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ]
  },
  {
    path: '/auth',
    element: <AuthContainer />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'verify-email',
        element: <Verify />,
      },
      {
        path: 'password-reset',
        element: <PasswordReset />,
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
