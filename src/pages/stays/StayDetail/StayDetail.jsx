import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stays } from '@/mocks';
import { hosts } from '@/mocks';
import { Container, Row, Col, Carousel, Button, Form, Alert, Badge, InputGroup, Modal } from 'react-bootstrap';
import { SuccessModal } from '@/components/modals';
import { formatNumberToARS } from '@/utils';
import { PrimaryButton } from '@/components/ui/buttons';

function calcularNoches (desde, hasta) {
  if (!desde || !hasta) return 0;
  const d1 = new Date(desde);
  const d2 = new Date(hasta);
  const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff : 0;
}

export const StayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alojamiento = stays.find(a => a.id === Number(id));
  const host = alojamiento ? hosts.find(h => h.id === alojamiento.hostId) : null;
  const [contactado, setContactado] = useState(false);
  const [reservado, setReservado] = useState(false);
  const [fechas, setFechas] = useState({ desde: '', hasta: '' });
  const [huespedes, setHuespedes] = useState(1);
  const [showPreorder, setShowPreorder] = useState(false);
  const [showPago, setShowPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [mensaje, setMensaje] = useState('');
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
      setMensaje('')
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

  const handleContinuarPreorder = () => {
    setShowPreorder(false);
    setShowPago(true);
  };

  const handleConfirmarPago = () => {
    if (metodoPago && aceptarTerminos) {
      setReservado(true);
      setShowPago(false);
      setMetodoPago('')
      setAceptarTerminos(false)
    } else {
      alert("Por favor, elija un método de pago y acepte los términos y condiciones.");
    }
  };

  const handleCloseSuccessReservationModal = () => {
    setReservado(false)
  }

  const handleCloseSuccessContactModal = () => {
    setContactado(false)
  }

  return (
    <Container fluid className="py-4" style={{ background: '#fafafa', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={9}>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4" style={{ display: 'flex', alignItems: 'center', borderRadius: 20, boxShadow: '0 2px 8px #0001' }}>
            <span style={{ marginRight: '0.5rem', fontSize: 20 }}>&larr;</span> Volver
          </Button>
          <Row className="g-4">
            {/* Galería de imágenes */}
            <Col xs={12} md={7}>
              <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 24px #0002', background: '#fff' }}>
                <Carousel interval={null} indicators={alojamiento.images.length > 1}>
                  {alojamiento.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img src={img} alt="Imagen alojamiento" className="d-block w-100" style={{ maxHeight: 420, objectFit: 'cover' }} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              {/* Anfitrión y descripción */}
              <div className="mt-4 p-4" style={{ borderRadius: 16, background: '#fff', boxShadow: '0 2px 8px #0001' }}>
                <h5 className="fw-bold mb-3">Anfitrión</h5>
                {host && (
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', background: '#FF5A5F22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#FF5A5F' }}>
                      {host.name[0]}
                    </div>
                    <div>
                      <div className="fw-semibold" style={{ fontSize: 18 }}>{host.name}</div>
                      <div className="text-muted" style={{ fontSize: 15 }}>{host.descripcion}</div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            {/* Tarjeta de reserva */}
            <Col xs={12} md={5}>
              <div style={{ borderRadius: 18, boxShadow: '0 4px 24px #0002', background: '#fff', padding: 32, position: 'sticky', top: 32 }}>
                <h2 className="fw-bold mb-2" style={{ fontSize: 32 }}>{alojamiento.name}</h2>
                {alojamiento.isFeatured && <Badge bg="warning" text="dark" className="mb-2">⭐ Destacado</Badge>}
                <p className="mb-1"><strong>Ciudad:</strong> {alojamiento.city}</p>
                <p className="mb-1"><strong>Precio por noche:</strong> {formatNumberToARS(alojamiento.pricePerNight)}</p>
                <p className="mb-1"><strong>Calificación:</strong> ★ {alojamiento.rating}</p>
                <p className="mt-3 mb-4" style={{ color: '#717171' }}>{alojamiento.description}</p>

                {/* Sección de servicios simplificada */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Servicios disponibles</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {alojamiento.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="px-3 py-2"
                        style={{
                          background: '#f7f7f7',
                          borderRadius: 12,
                          fontSize: 14,
                          color: '#484848'
                        }}
                      >
                        <span style={{ textTransform: 'capitalize' }}>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" className="me-2 mb-3" onClick={() => setShowContact(true)} style={{ backgroundColor: '#767676', color: 'white', borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
                  Contactar al anfitrión
                </Button>
                <Form onSubmit={handleReservar} className="mb-2">
                  <Form.Group className="mb-2" controlId="fechaDesde">
                    <Form.Label>Desde</Form.Label>
                    <Form.Control type="date" value={fechas.desde} onChange={e => setFechas(f => ({ ...f, desde: e.target.value }))} required style={{ borderRadius: 10, boxShadow: '0 1px 4px #0001' }} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="fechaHasta">
                    <Form.Label>Hasta</Form.Label>
                    <Form.Control type="date" value={fechas.hasta} onChange={e => setFechas(f => ({ ...f, hasta: e.target.value }))} required style={{ borderRadius: 10, boxShadow: '0 1px 4px #0001' }} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="huespedes">
                    <Form.Label>Huéspedes</Form.Label>
                    <InputGroup>
                      <Button variant="outline-secondary" onClick={() => setHuespedes(h => Math.max(1, h - 1))} disabled={huespedes <= 1} style={{ borderRadius: 10 }}>-</Button>
                      <Form.Control type="number" value={huespedes} min={1} max={10} onChange={e => setHuespedes(Number(e.target.value))} style={{ width: 60, textAlign: 'center', borderRadius: 10, boxShadow: '0 1px 4px #0001' }} />
                      <Button variant="outline-secondary" onClick={() => setHuespedes(h => Math.min(10, h + 1))} disabled={huespedes >= 10} style={{ borderRadius: 10 }}>+</Button>
                    </InputGroup>
                  </Form.Group>
                  <Button type="submit" variant="danger" disabled={noches === 0} className="w-100" style={{ backgroundColor: '#FF5A5F', color: 'white', borderRadius: 14, fontWeight: 700, fontSize: 20, boxShadow: '0 2px 8px #FF5A5F33', transition: 'background 0.2s' }}>
                    Reservar
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal de Preorder (Resumen de la reserva) */}
      <Modal show={showPreorder} onHide={() => setShowPreorder(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resumen de la reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2 p-2 border rounded bg-light">
            <div className="d-flex justify-content-between"><span>{noches} {noches === 1 ? 'noche' : 'noches'} x {formatNumberToARS(alojamiento.pricePerNight)}</span><span>{formatNumberToARS(subtotal)}</span></div>
            <div className="d-flex justify-content-between"><span>Tarifa de servicio</span><span>{formatNumberToARS(tarifaServicio)}</span></div>
            <div className="d-flex justify-content-between"><span>Tarifa de limpieza</span><span>{formatNumberToARS(tarifaLimpieza)}</span></div>
            <hr className="my-2" />
            <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatNumberToARS(total)}</span></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreorder(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleContinuarPreorder} style={{ backgroundColor: '#FF5A5F', color: 'white' }}>Continuar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Pago (método de pago y términos) */}
      <Modal show={showPago} onHide={() => setShowPago(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2" controlId="metodoPago">
            <Form.Label>Método de pago</Form.Label>
            <Form.Select value={metodoPago} onChange={e => setMetodoPago(e.target.value)} required>
              <option value="">Seleccione un método de pago</option>
              <option value="card1">Tarjeta **** **** **** 5162</option>
              <option value="card2">Tarjeta **** **** **** 8390</option>
              <option value="mercadopago">MercadoPago</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2" controlId="aceptarTerminos">
            <Form.Check type="checkbox" label="Acepto los términos y condiciones" onChange={e => setAceptarTerminos(e.target.checked)} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPago(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmarPago} disabled={!metodoPago || !aceptarTerminos} style={{ backgroundColor: '#FF5A5F', color: 'white' }}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de reserva exitosa */}
      <SuccessModal
        isOpen={reservado}
        onClose={handleCloseSuccessReservationModal}
        title="¡Reserva confirmada!"
        body="Tu reserva fue realizada con éxito."
      />
      {/* Modal de Contacto (ContactModal) */}
      <Modal show={showContact} onHide={() => setShowContact(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contactar al anfitrión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="mensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              placeholder="Escriba su mensaje aquí..."
              style={{ resize: 'none' }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContact(false)}>Cancelar</Button>
          <PrimaryButton onClick={handleEnviarMensaje} disabled={!mensaje.trim()}>Enviar</PrimaryButton>
        </Modal.Footer>
      </Modal>
      {/* Modal de contacto exitoso */}
      <SuccessModal
        isOpen={contactado}
        onClose={handleCloseSuccessContactModal}
        title="¡Mensaje enviado!"
        body="Tu consulta fue enviada con éxito."
      />
    </Container>
  );
} 