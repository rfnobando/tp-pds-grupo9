import { Spinner } from 'react-bootstrap'
import styles from './SimpleLoader.module.css'

export const SimpleLoader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      className={styles.spinner}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}
