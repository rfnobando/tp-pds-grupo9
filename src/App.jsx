import { Navigate, Route, Routes } from 'react-router-dom'
import { BaseTemplate } from './templates'
import { Home } from './pages'
import { StayDetail } from './pages/stays'
import { ReservationList } from './pages/profile'

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<BaseTemplate />}>
        <Route index element={<Home />} />
        <Route path="stays">
          <Route index element={<Navigate to="/" replace />} />
          <Route path=":id" element={<StayDetail />} />
        </Route>
        <Route path="profile">
          <Route index element={<Navigate to="/profile/reservations" replace />} />
          <Route path="reservations" element={<ReservationList />} />
        </Route>
      </Route>
    </Routes>
  )
}