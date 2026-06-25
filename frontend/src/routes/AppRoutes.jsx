import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout/MainLayout'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import Private from '../components/private/Private'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import ColecoesPage from '../pages/ColecoesPage/ColecoesPage'
import ColecaoDetalhePage from '../pages/ColecaoDetalhePage/ColecaoDetalhePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Private><MainLayout /></Private>}>
        <Route path="/" element={<HomePage />} />
        <Route path="suascolecoes" element={<ColecoesPage />} />
        <Route path="colecoes" element={<ColecoesPage />} />
        <Route path="suascolecoes/:id" element={<ColecaoDetalhePage />} />
        <Route path="colecoes/:id" element={<ColecaoDetalhePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
