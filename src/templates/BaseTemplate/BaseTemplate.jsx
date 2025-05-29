import { useEffect, useState } from 'react'
import { BaseFooter, BaseNavbar } from '@/components/layout'
import { PageLoader } from '@/components/ui/loaders'
import { Outlet } from 'react-router-dom'
import styles from './BaseTemplate.module.css'

export const BaseTemplate = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className={styles.container}>
      <BaseNavbar />
      <main className={`bg-body-tertiary px-3 ${styles.outletContainer}`}>
        <Outlet />
      </main>
      <BaseFooter />
    </div>
  )
}
