import { Navigate, Route, Routes } from 'react-router-dom'
import { BaseTemplate } from './templates'
import { Home, StayDetail } from './pages'

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<BaseTemplate />}>
        <Route index element={<Home />} />
        <Route path="stays">
          <Route index element={<Navigate to="/" replace />} />
          <Route path=":id" element={<StayDetail />} />
        </Route>
      </Route>
    </Routes>
  )
}