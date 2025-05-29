import { Route, Routes } from 'react-router-dom'
import { BaseTemplate } from './templates'
import { Home, AlojamientoDetalle } from './pages'

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<BaseTemplate />}>
        <Route index element={<Home />} />
        <Route path="alojamiento/:id" element={<AlojamientoDetalle />} />
      </Route>
    </Routes>
  )
}