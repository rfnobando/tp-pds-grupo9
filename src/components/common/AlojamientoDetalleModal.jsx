import React, { useState } from 'react';
import { Modal, Button, Carousel, Form, Alert } from 'react-bootstrap';

export const AlojamientoDetalleModal = ({ show, onHide, alojamiento }) => {
  const [contactado, setContactado] = useState(false);
  const [reservado, setReservado] = useState(false);
  const [fechas, setFechas] = useState({ desde: '', hasta: '' });

  if (!alojamiento) return null;

  const handleContactar = () => {
    setContactado(true);
    setTimeout(() => setContactado(false), 2000);
  };

  const handleReservar = (e) => {
    e.preventDefault();
    setReservado(true);
    setTimeout(() => setReservado(false), 2000);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{alojamiento.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel className="mb-3">
          {alojamiento.images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img src={img} alt="Imagen alojamiento" className="d-block w-100" style={{ maxHeight: 350, objectFit: 'cover' }} />
            </Carousel.Item>
          ))}
        </Carousel>
        <p><strong>Ciudad:</strong> {alojamiento.city}</p>
        <p><strong>Descripción:</strong> {alojamiento.description}</p>
        <p><strong>Precio por noche:</strong> ${alojamiento.pricePerNight}</p>
        <p><strong>Calificación:</strong> ★ {alojamiento.rating}</p>
        <hr />
        <Button variant="primary" className="me-2" onClick={handleContactar} disabled={contactado}>
          {contactado ? '¡Mensaje enviado!' : 'Contactar al anfitrión'}
        </Button>
        <Form className="d-inline-block" onSubmit={handleReservar} style={{ minWidth: 220 }}>
          <Form.Group className="mb-2" controlId="fechaDesde">
            <Form.Label>Desde</Form.Label>
            <Form.Control type="date" value={fechas.desde} onChange={e => setFechas(f => ({ ...f, desde: e.target.value }))} required />
          </Form.Group>
          <Form.Group className="mb-2" controlId="fechaHasta">
            <Form.Label>Hasta</Form.Label>
            <Form.Control type="date" value={fechas.hasta} onChange={e => setFechas(f => ({ ...f, hasta: e.target.value }))} required />
          </Form.Group>
          <Button type="submit" variant="success" disabled={reservado}>
            {reservado ? '¡Reserva confirmada!' : 'Reservar'}
          </Button>
        </Form>
        {reservado && <Alert variant="success" className="mt-3">¡Reserva realizada con éxito!</Alert>}
      </Modal.Body>
    </Modal>
  );
}; 