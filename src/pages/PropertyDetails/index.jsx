import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { stays, hosts } from '@/mocks';
import { formatNumberToARS } from '@/utils';
import BookingModal from '@/components/ui/BookingModal/BookingModal';
import './styles.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Buscar la propiedad en los mocks
  const property = stays.find(stay => stay.id === parseInt(id));

  // Si no se encuentra la propiedad, redirigir a home
  if (!property) {
    navigate('/');
    return null;
  }

  // Obtener el anfitrión correspondiente
  const host = hosts[property.id];

  // Datos adicionales que no están en los mocks
  const additionalData = {
    amenities: [
      "WiFi",
      "Estacionamiento",
      "Aire acondicionado",
      "Cocina equipada",
      "TV Smart",
      property.city.includes("Mar del Plata") ? "Piscina" : "Calefacción",
      property.city.includes("Bariloche") ? "Chimenea" : "Balcón",
      property.city.includes("Tigre") ? "Acceso al río" : "Jardín"
    ]
  };

  const handleContactHost = () => {
    // Aquí iría la lógica para contactar al anfitrión
    alert(`Contactando a ${host.name}. En una implementación real, esto abriría un chat o formulario de contacto.`);
  };

  return (
    <Container className="property-details py-4">
      <Row>
        <Col>
          <h1 className="mb-3">{property.name}</h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="rating">★ {property.rating.toFixed(1)}</span>
              <span className="reviews ms-2">(124 reseñas)</span>
              <span className="location ms-2">· {property.city}</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Carrusel de imágenes */}
      <Row className="mb-4">
        <Col>
          <Carousel>
            {property.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${property.name} - Imagen ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row>
        {/* Columna principal */}
        <Col md={8}>
          {/* Información del anfitrión */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Anfitrión: {host.name}</h5>
                  <p className="mb-0">Se unió en {host.joinDate}</p>
                  <p className="mb-0">Tasa de respuesta: {host.responseRate}</p>
                  <p className="mb-0">Tiempo de respuesta: {host.responseTime}</p>
                  <p className="mt-2 mb-0">{host.description}</p>
                </div>
                <Button variant="outline-dark" onClick={handleContactHost}>
                  Contactar al anfitrión
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Descripción */}
          <Card className="mb-4">
            <Card.Body>
              <h4>Acerca de este lugar</h4>
              <p>{property.description}</p>
            </Card.Body>
          </Card>

          {/* Comodidades */}
          <Card className="mb-4">
            <Card.Body>
              <h4>Lo que ofrece este lugar</h4>
              <Row>
                {additionalData.amenities.map((amenity, index) => (
                  <Col xs={6} md={4} key={index} className="mb-2">
                    <div className="amenity-item">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      {amenity}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna lateral - Reserva */}
        <Col md={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <div className="price-section mb-3">
                <h3>{formatNumberToARS(property.pricePerNight)} <small className="text-muted">/ noche</small></h3>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mb-3"
                onClick={() => setShowBookingModal(true)}
              >
                Reservar ahora
              </Button>
              <p className="text-center text-muted">
                No se cobrará nada todavía
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de reserva */}
      <BookingModal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        property={property}
      />
    </Container>
  );
};

export default PropertyDetails; 