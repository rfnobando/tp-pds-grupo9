import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { stays } from '@/mocks'

export const Home = () => {
  return (
    <Container>
      <Row className="align-items-center justify-content-between mb-4">
        <Col xs="12" md="8">
          <h2 className="fw-bold display-7 mb-1">Alojamientos destacados en Argentina</h2>
          <p className="text-muted mb-0">
            Encuentra lugares únicos para tu próxima estadía, desde cabañas en la montaña hasta departamentos en la ciudad.
          </p>
        </Col>
        <Col xs="12" md="4" className="text-md-end mt-3 mt-md-0">
          <Button variant="primary">Explorar Más</Button>
        </Col>
      </Row>
      <Row>
        {stays.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
            <Card className="flex-fill d-flex flex-column">
              <Card.Img variant="top" src={item.images[0]} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
