import { useParams, useNavigate } from 'react-router-dom';
import { stays } from '@/mocks/stays';
import { Container, Row, Col, Carousel, Button, Form, Alert, Badge, Modal } from 'react-bootstrap';
import { useState, useMemo } from 'react';
import { formatNumberToARS } from '@/utils';

function calcularNoches(desde, hasta) {
  if (!desde || !hasta) return 0;
  const d1 = new Date(desde);
  const d2 = new Date(hasta);
  const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff : 0;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const alojamiento = stays.find(a => a.id === Number(id));
  const [contactado, setContactado] = useState(false);
  const [reservado, setReservado] = useState(false);
  const [fechas, setFechas] = useState({ desde: '', hasta: '' });
  const [huespedes, setHuespedes] = useState(1);
  const [showPreorder, setShowPreorder] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  // Tarifas fijas
  const tarifaServicio = 2500;
  const tarifaLimpieza = 1800;

  const noches = useMemo(() => calcularNoches(fechas.desde, fechas.hasta), [fechas]);
  const subtotal = alojamiento ? noches * alojamiento.pricePerNight : 0;
  const total = subtotal + tarifaServicio + tarifaLimpieza;

  if (!alojamiento) {
    return (
      <Container className="mt-5 text-center">
        <h2>Alojamiento no encontrado</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  const handleEnviarMensaje = () => {
    if (mensaje.trim()) {
      setContactado(true);
      setShowContact(false);
      setTimeout(() => setContactado(false), 2000);
    } else {
      alert("Por favor, escriba un mensaje.");
    }
  };

  const handleReservar = (e) => {
    e.preventDefault();
    if (noches > 0) {
      setShowPreorder(true);
    }
  };

  const handleConfirmarPreorder = () => {
    if (metodoPago && aceptarTerminos) {
      setReservado(true);
      setShowPreorder(false);
      setTimeout(() => setReservado(false), 2000);
    } else {
      alert("Por favor, elija un método de pago y acepte los términos y condiciones.");
    }
  };

  return (
    <Container className="mt-4">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '0.5rem' }}>&larr;</span> Volver
      </Button>
      <Row>
        <Col md={7}>
          <Carousel className="mb-3">
            {alojamiento.images.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img src={img} alt="Imagen alojamiento" className="d-block w-100" style={{ maxHeight: 400, objectFit: 'cover' }} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={5}>
          <h2 className="fw-bold">{alojamiento.name}</h2>
          {alojamiento.isFeatured && <Badge bg="warning" text="dark" className="mb-2">⭐ Destacado</Badge>}
          <p className="mb-1"><strong>Precio por noche:</strong> {formatNumberToARS(alojamiento.pricePerNight)}</p>
          <p className="mb-1"><strong>Calificación:</strong> ★ {alojamiento.rating}</p>
          <p className="mt-3">{alojamiento.description}</p>
          <hr />
          <Button variant="secondary" className="me-2 mb-2" onClick={() => setShowContact(true)} disabled={contactado} style={{ backgroundColor: '#767676', color: 'white' }}>
            {contactado ? '¡Mensaje enviado!' : 'Contactar al anfitrión'}
          </Button>
          <Form onSubmit={handleReservar} className="mb-2">
            <Form.Group className="mb-2" controlId="fechaDesde">
              <Form.Label>Desde</Form.Label>
              <Form.Control type="date" value={fechas.desde} onChange={e => setFechas(f => ({ ...f, desde: e.target.value }))} required />
            </Form.Group>
            <Form.Group className="mb-2" controlId="fechaHasta">
              <Form.Label>Hasta</Form.Label>
              <Form.Control type="date" value={fechas.hasta} onChange={e => setFechas(f => ({ ...f, hasta: e.target.value }))} required />
            </Form.Group>
            <Form.Group className="mb-2" controlId="huespedes">
              <Form.Label>Huéspedes</Form.Label>
              <Form.Control type="number" value={huespedes} min={1} max={10} onChange={e => setHuespedes(Number(e.target.value))} />
            </Form.Group>
            <Button type="submit" variant="danger" disabled={noches === 0} className="w-100" style={{ backgroundColor: '#FF5A5F', color: 'white' }}>
              Reservar
            </Button>
          </Form>
          {reservado && <Alert variant="success">¡Reserva realizada con éxito!</Alert>}
        </Col>
      </Row>

      {/* Modal de Preorder (Confirmar reserva) */}
      <Modal show={showPreorder} onHide={() => setShowPreorder(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Resumen de la reserva</h5>
          <div className="mb-2 p-2 border rounded bg-light">
            <div className="d-flex justify-content-between"><span>{noches} noches x {formatNumberToARS(alojamiento.pricePerNight)}</span><span>{formatNumberToARS(subtotal)}</span></div>
            <div className="d-flex justify-content-between"><span>Tarifa de servicio</span><span>{formatNumberToARS(tarifaServicio)}</span></div>
            <div className="d-flex justify-content-between"><span>Tarifa de limpieza</span><span>{formatNumberToARS(tarifaLimpieza)}</span></div>
            <hr className="my-2" />
            <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatNumberToARS(total)}</span></div>
          </div>
          <Form.Group className="mb-2" controlId="metodoPago">
            <Form.Label>Método de pago</Form.Label>
            <Form.Select value={metodoPago} onChange={e => setMetodoPago(e.target.value)} required>
              <option value="">Seleccione un método de pago</option>
              <option value="TC">Tarjeta de Crédito</option>
              <option value="TD">Tarjeta de Débito</option>
              <option value="transfer">Transferencia</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2" controlId="aceptarTerminos">
            <Form.Check type="checkbox" label="Acepto los términos y condiciones" onChange={e => setAceptarTerminos(e.target.checked)} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreorder(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmarPreorder} disabled={!metodoPago || !aceptarTerminos} style={{ backgroundColor: '#FF5A5F', color: 'white' }}>Confirmar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Contacto */}
      <Modal show={showContact} onHide={() => setShowContact(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contactar al anfitrión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="mensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Escriba su mensaje aquí..." />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContact(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEnviarMensaje} disabled={!mensaje.trim()}>Enviar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 