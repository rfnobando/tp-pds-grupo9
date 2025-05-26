import { Spinner, Container } from 'react-bootstrap'
import styles from './PageLoader.module.css'

export const PageLoader = () => {
  return (
    <Container
      fluid={true}
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Spinner
        animation="grow"
        role="status"
        className={styles.spinner}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  )
}
