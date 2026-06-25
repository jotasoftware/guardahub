import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SidebarProvider } from './context/SidebarContext';
import { BreadcrumbProvider } from './context/BreadcrumbContext';
import { ColecaoProvider } from './context/ColecaoContext';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { ItemProvider } from './context/ItemContext';
import { ComentarioProvider } from './context/ComentarioContext';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <AuthProvider>
          <SidebarProvider>
            <BreadcrumbProvider>
                <ColecaoProvider>
                  <ComentarioProvider>
                    <ItemProvider>
                      <AppRoutes />
                    </ItemProvider>
                  </ComentarioProvider>
                </ColecaoProvider>
            </BreadcrumbProvider>
          </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
