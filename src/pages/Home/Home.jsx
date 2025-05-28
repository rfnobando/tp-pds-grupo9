import { useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { stays } from '@/mocks'
import { formatNumberToARS } from '@/utils'
import { SearchBar } from '@/components/common'

export const Home = () => {
  const [busqueda, setBusqueda] = useState('')
  const [minPrecio, setMinPrecio] = useState('')
  const [maxPrecio, setMaxPrecio] = useState('')

  // Filtrado por 'name' y rango de precios
  const staysFiltrados = stays.filter(item => {
    const coincideNombre = !busqueda || item.name.toLowerCase().includes(busqueda.toLowerCase())
    const precio = item.pricePerNight
    const cumpleMin = !minPrecio || precio >= parseFloat(minPrecio)
    const cumpleMax = !maxPrecio || precio <= parseFloat(maxPrecio)
    return coincideNombre && cumpleMin && cumpleMax
  })

  return (
    <Container>
      {/* Barra de búsqueda */}
      <Row className="mb-4">
        <Col className="mb-4" xs="12" md="8">
          <h2 className="fw-bold display-7 mb-1">Encuentra el lugar ideal para tu estadía</h2>
          <p className="text-muted mb-0">
            Descubre opciones únicas para tu próxima estadía, desde cabañas en la montaña hasta departamentos en la ciudad.
          </p>
        </Col>
        <Col xs="12" md="6" lg="7">
          <SearchBar value={busqueda} onChange={setBusqueda} />
        </Col>
        <Col className="mb-3" xs="6" md="3" lg="2">
          <Form.Control
            className="form-control form-control-lg"
            type="number"
            min={0}
            value={minPrecio}
            placeholder="Precio mínimo"
            onChange={e => setMinPrecio(e.target.value)}
          />
        </Col>
        <Col xs="6" md="3" lg="2">
          <Form.Control
            className="form-control form-control-lg"
            type="number"
            min={0}
            value={maxPrecio}
            placeholder="Precio máximo"
            onChange={e => setMaxPrecio(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="align-items-center justify-content-between mb-4">
        <Col xs="12" md="8">
          <h2 className="fw-bold display-7 mb-1">Alojamientos destacados en Argentina</h2>
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
            <div className="text-center mt-5 text-muted">
              <h4>No se encontraron alojamientos que coincidan con tus criterios 😕</h4>
              <p>
                No te preocupes, hay muchas otras opciones disponibles.<br />
                Intenta ajustar los filtros o buscar en otra zona para descubrir alojamientos interesantes.
              </p>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  )
}
