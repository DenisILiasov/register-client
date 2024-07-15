import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Profile } from './pages/profile';



const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {path: '/', element: <Auth/>}, {path: '/profile', element: <Profile/>}
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


