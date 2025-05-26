import { BaseFooter, BaseNavbar } from '@/components/layout'
import { Outlet } from 'react-router-dom'
import styles from './BaseTemplate.module.css'

export const BaseTemplate = () => {
  return (
    <div className={styles.container}>
      <BaseNavbar />
      <main className={styles.outletContainer}>
        <Outlet />
      </main>
      <BaseFooter />
    </div>
  )
}
