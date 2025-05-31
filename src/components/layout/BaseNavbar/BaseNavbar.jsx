import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import styles from './BaseNavbar.module.css'

export const BaseNavbar = () => {
  return (
    <Navbar expand={false} fixed="top" className="bg-body-tertiary">
      <Container fluid={true} className="px-4 py-2">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/images/navbar-brand.svg"
            alt="Brand"
            className={styles.brandImage}
          />
        </Navbar.Brand>
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id="dropdown-user" className="border-0 bg-transparent p-0">
            <PersonCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="mt-2">
            <div className="px-3 pb-2 fw-semibold text-dark">
              ¡Hola, Usuario!
            </div>
            <Dropdown.Item as={Link} to="/profile/reservations" className="px-3">
              Mis reservas
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  )
}
