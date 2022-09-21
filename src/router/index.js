import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, Planet, Resident, NotFound } from '../pages';

const Router = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={ <Dashboard /> } />
      <Route path="/planet/:id" element={ <Planet /> } />
      <Route path="/resident/:id" element={ <Resident /> } />
      <Route path="/not-found" element={ <NotFound /> } />
      <Route path="/*" element={ <Navigate to="/dashboard" replace /> } />
    </Routes>
  )
}

export default Router;
