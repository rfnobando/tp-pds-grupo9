import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { formatNumberToARS } from '@/utils';
import './styles.css';

const BookingModal = ({ show, onHide, property }) => {
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  const totalNights = dates.checkIn && dates.checkOut 
    ? Math.ceil((new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  const subtotal = property.pricePerNight * totalNights;
  const cleaningFee = Math.round(subtotal * 0.1);
  const serviceFee = Math.round(subtotal * 0.15);
  const total = subtotal + cleaningFee + serviceFee;

  const handleNext = () => {
    if (step === 1 && dates.checkIn && dates.checkOut) {
      setStep(2);
    } else if (step === 2 && guests > 0) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Aquí iría la lógica de reserva real
    alert('¡Reserva realizada con éxito!');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Reservar {property.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <>
            <h5>Selecciona tus fechas</h5>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Llegada</Form.Label>
                  <Form.Control
                    type="date"
                    value={dates.checkIn}
                    onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Salida</Form.Label>
                  <Form.Control
                    type="date"
                    value={dates.checkOut}
                    onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                    min={dates.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label>Huéspedes</Form.Label>
              <Form.Select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'huésped' : 'huéspedes'}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </>
        )}

        {step === 2 && (
          <>
            <h5>Resumen de tu estadía</h5>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>{formatNumberToARS(property.pricePerNight)} x {totalNights} noches</span>
                  <span>{formatNumberToARS(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tarifa de limpieza</span>
                  <span>{formatNumberToARS(cleaningFee)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tarifa de servicio</span>
                  <span>{formatNumberToARS(serviceFee)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>{formatNumberToARS(total)}</span>
                </div>
              </Card.Body>
            </Card>
          </>
        )}

        {step === 3 && (
          <>
            <h5>Método de pago</h5>
            <Form.Group className="mb-4">
              <Form.Check
                type="radio"
                id="creditCard"
                label="Tarjeta de crédito"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-2"
              />
              <Form.Check
                type="radio"
                id="debitCard"
                label="Tarjeta de débito"
                name="paymentMethod"
                value="debitCard"
                checked={paymentMethod === 'debitCard'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-2"
              />
              <Form.Check
                type="radio"
                id="transfer"
                label="Transferencia bancaria"
                name="paymentMethod"
                value="transfer"
                checked={paymentMethod === 'transfer'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>

            {paymentMethod && (
              <Card className="mb-4">
                <Card.Body>
                  <h6>Información de pago</h6>
                  <p className="text-muted small">
                    Al hacer clic en "Reservar", aceptas las políticas de cancelación y las reglas de la casa.
                    No se te cobrará nada todavía.
                  </p>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && (
          <Button variant="outline-secondary" onClick={handleBack}>
            Atrás
          </Button>
        )}
        {step < 3 ? (
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={
              (step === 1 && (!dates.checkIn || !dates.checkOut)) ||
              (step === 2 && guests < 1) ||
              (step === 3 && !paymentMethod)
            }
          >
            Siguiente
          </Button>
        ) : (
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!paymentMethod}
          >
            Reservar ahora
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal; 