import { useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap'
import { stays } from '@/mocks'
import { formatNumberToARS } from '@/utils'
import { SearchBar } from '@/components/common'
import { ARSInput } from '@/components/ui/inputs'

export const Home = () => {
  const [busqueda, setBusqueda] = useState('')
  const [minPrecio, setMinPrecio] = useState('0')
  const [maxPrecio, setMaxPrecio] = useState('80000')
  const [onlyFeatured, setOnlyFeatured] = useState(false)
  const [showTopRatedFirst, setShowTopRatedFirst] = useState(false)

  const handleARSInputChange = (setValue) => (values) => {
    setValue(values.floatValue !== undefined ? values.value : '')
    console.log(values)
  }

  // Filtrado por 'city', rango de precios y destacados
  const staysFiltrados = stays.filter(item => {
    const coincideCiudad = !busqueda || item.city.toLowerCase().includes(busqueda.toLowerCase())
    const precio = item.pricePerNight
    const cumpleMin = !minPrecio || precio >= parseFloat(minPrecio)
    const cumpleMax = !maxPrecio || precio <= parseFloat(maxPrecio)
    const featuredValidation = onlyFeatured ? item.isFeatured : true
    return coincideCiudad && cumpleMin && cumpleMax && featuredValidation
  })

  if (showTopRatedFirst) {
    staysFiltrados.sort((left, right) => right.rating - left.rating)
  }

  return (
    <Container>
      {/* Barra de búsqueda */}
      <Row className="mb-5">
        <Col className="mb-4" xs="12" md="8">
          <h2 className="fw-bold display-7 mb-1">Encuentra el lugar ideal para tu estadía</h2>
          <p className="text-muted mb-0">
            Descubre opciones únicas para tu próxima estadía, desde cabañas en la montaña hasta departamentos en la ciudad.
          </p>
        </Col>
        <Col xs="12" md="6" lg="8">
          <Form.Group controlId="searchBar">
            <Form.Label className="fw-semibold">
              Buscar por ciudad
            </Form.Label>
            <SearchBar
              value={busqueda}
              onChange={setBusqueda}
            />
          </Form.Group>
        </Col>
        <Col className="mb-3" xs="6" md="3" lg="2">
          <Form.Group controlId="minPrice">
            <Form.Label className="fw-semibold">Precio mínimo</Form.Label>
            <ARSInput
              className="form-control form-control-lg"
              min={0}
              value={minPrecio}
              placeholder="$ 0,00"
              prefix="$ "
              onValueChange={handleARSInputChange(setMinPrecio)}
            />
          </Form.Group>
        </Col>
        <Col xs="6" md="3" lg="2">
          <Form.Group controlId="maxPrice">
            <Form.Label className="fw-semibold">Precio máximo</Form.Label>
            <ARSInput
              className="form-control form-control-lg"
              min={0}
              value={maxPrecio}
              placeholder="$ 80.000,00"
              prefix="$ "
              onValueChange={handleARSInputChange(setMaxPrecio)}
            />
          </Form.Group>
        </Col>
        <Col xs="12" sm="6" md="3" lg="3" className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="featured-only-switch"
            label={<span className="fw-semibold text-nowrap">Solo destacados</span>}
            checked={onlyFeatured}
            onChange={() => setOnlyFeatured(prevState => !prevState)}
          />
        </Col>
        <Col xs="12" sm="6" md="4" lg="3" className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="sort-by-rating-switch"
            label={<span className="fw-semibold text-nowrap">Más valorados primero</span>}
            checked={showTopRatedFirst}
            onChange={() => setShowTopRatedFirst(prevState => !prevState)}
          />
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between mb-4">
        <Col xs="12" md="8">
          <h2 className="fw-bold display-7 mb-1">Alojamientos en Argentina</h2>
        </Col>
      </Row>
      <Row>
        {staysFiltrados.length > 0 ? (
          staysFiltrados.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
              <Card className="flex-fill d-flex flex-column">
                {item.isFeatured && (
                  <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute top-0 start-0 m-2"
                  >
                    ⭐ Destacado
                  </Badge>
                )}
                <Card.Img variant="top" src={item.images[0]} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {formatNumberToARS(item.pricePerNight)} por noche · ★ {item.rating.toFixed(1)}
                  </Card.Text>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
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
