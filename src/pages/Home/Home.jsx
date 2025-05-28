import { useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { stays } from '@/mocks'
import { formatNumberToARS } from '@/utils'
import { SearchBar } from '@/components/common'

export const Home = () => {
  const [busqueda, setBusqueda] = useState('')
  const [minPrecio, setMinPrecio] = useState('')
  const [maxPrecio, setMaxPrecio] = useState('')

  // Filtrado solo por el nombre/título (name)
  const staysFiltrados = stays.filter(item => {
    const coincideNombre = !busqueda || item.name.toLowerCase().includes(busqueda.toLowerCase())
    const precio = item.pricePerNight
    const cumpleMin = !minPrecio || precio >= parseInt(minPrecio)
    const cumpleMax = !maxPrecio || precio <= parseInt(maxPrecio)
    return coincideNombre && cumpleMin && cumpleMax
  })

  return (
    <Container>
      {/* Barra de búsqueda */}
      <Row className="mb-4">
        <Col xs="12" md="6" lg="7">
          <SearchBar value={busqueda} onChange={setBusqueda} />
        </Col>
        <Col xs="6" md="3" lg="2">
          <Form.Control
            type="number"
            min={0}
            value={minPrecio}
            placeholder="Precio mínimo"
            onChange={e => setMinPrecio(e.target.value)}
            className="mb-2"
          />
        </Col>
        <Col xs="6" md="3" lg="2">
          <Form.Control
            type="number"
            min={0}
            value={maxPrecio}
            placeholder="Precio máximo"
            onChange={e => setMaxPrecio(e.target.value)}
            className="mb-2"
          />
        </Col>
      </Row>

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
        {staysFiltrados.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
            <Card className="flex-fill d-flex flex-column">
              <Card.Img variant="top" src={item.images[0]} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {formatNumberToARS(item.pricePerNight)} por noche - {item.rating} estrellas
                </Card.Text>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {staysFiltrados.length === 0 && (
          <Col>
            <div className="text-center mt-5 text-muted">No se encontraron alojamientos con esos filtros.</div>
          </Col>
        )}
      </Row>
    </Container>
  )
}
