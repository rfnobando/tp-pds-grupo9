import { Route, Routes } from 'react-router-dom'
import { BaseTemplate } from './templates'
import { Home } from './pages'

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<BaseTemplate />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}