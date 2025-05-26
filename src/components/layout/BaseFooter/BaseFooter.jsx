import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const BaseFooter = () => (
  <footer className="bg-light py-4 mt-auto">
    <Container>
      <Row>
        <Col className="text-center">
          &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
        </Col>
      </Row>
    </Container>
  </footer>
)
