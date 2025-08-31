import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AdmincontextProvider from './context/Admincontext.jsx'
import TranscontextProvider from './context/Transcontext.jsx'

import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdmincontextProvider>
      <TranscontextProvider>
       
      <StrictMode>
        <App />
        <ToastContainer
         position="top-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
         bodyClassName='toastBody'/>
      </StrictMode>
      
      </TranscontextProvider>
    </AdmincontextProvider>
  </BrowserRouter>,
)
