import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, ListGroup, Badge, Button } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons'
import { formatDateToDMY, formatNumberToARS } from '@/utils'
import { reservations, stays } from '@/mocks'
import { SimpleLoader } from '@/components/ui/loaders'
import { ResponsiveThumbnail } from './components'
import { ConfirmModal, SuccessModal } from '@/components/modals'

export const ReservationList = () => {
  const today = new Date()
  const [reservationsWithStays, setReservationsWithStays] = useState(null)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const [openedDeleteModalReservationId, setOpenedDeleteModalReservationId] = useState(null)
  const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false)

  const openConfirmDeleteModal = (reservationId) => () => {
    setIsConfirmDeleteModalOpen(true)
    setOpenedDeleteModalReservationId(reservationId)
  }

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false)
    setOpenedDeleteModalReservationId(null)
  }

  const handleConfirmDelete = () => {
    setIsConfirmDeleteModalOpen(false)
    setIsSuccessDeleteModalOpen(true)

    const updatedReservations = reservationsWithStays.map(r => ({
      ...r,
      status: openedDeleteModalReservationId === r.id ? 'Cancelada' : r.status
    }))

    setReservationsWithStays(updatedReservations)
  }

  const closeSuccessDeleteModal = () => {
    setIsSuccessDeleteModalOpen(false)
    setOpenedDeleteModalReservationId(null)
  }

  const joinReservationsWithStays = () => {
    const finalArray = reservations.map(r => {
      const tempRow = {
        ...r,
        stay: { ...(stays.find(s => s.id === r.stayId)) }
      }

      const rCheckOutDate = new Date(r.checkOut)
      tempRow.status = rCheckOutDate < today ? 'Finalizada' : 'Pendiente'

      return tempRow
    })

    setReservationsWithStays(finalArray)
  }

  useEffect(() => {
    joinReservationsWithStays()
  }, [])

  return (
    <Container>
      <h2 className="fw-bold mb-4">Mis Reservas</h2>
      {reservationsWithStays !== null ? (
        reservationsWithStays.length > 0 ? (
          <>
            <ListGroup variant="flush">
              {reservationsWithStays.map((r) => (
                <ListGroup.Item
                  key={r.id}
                  className="d-flex flex-column flex-sm-row align-items-center align-items-sm-center gap-3 py-5 py-sm-3"
                >
                  <Link to={`/stays/${r.stay.id}`} className="d-flex flex-row justify-content-center">
                    <ResponsiveThumbnail
                      src={r.stay.images[0]}
                      alt={r.stay.name}
                    />
                  </Link>
                  <div className="flex-grow-1 text-center text-sm-start">
                    <h5 className="mb-2">
                      <Link to={`/stays/${r.stay.id}`} className="text-reset text-decoration-none">
                        {r.stay.name}
                      </Link>
                    </h5>
                    <div className="text-muted small mb-2">
                      <div className="d-flex align-items-center justify-content-center justify-content-sm-start mb-1">
                        <PersonFill className="me-1" />
                        <span>
                          <strong>{r.guestQuantity}</strong> {r.guestQuantity === 1 ? 'huésped' : 'huéspedes'}
                        </span>
                      </div>
                      <div><strong>Ingreso:</strong> {formatDateToDMY(r.checkIn)}</div>
                      <div><strong>Salida:</strong> {formatDateToDMY(r.checkOut)}</div>
                      <div><strong>Total:</strong> {formatNumberToARS(r.totalPrice)}</div>
                    </div>
                    <Badge
                      bg={r.status === 'Finalizada' ? 'success' : r.status === 'Cancelada' ? 'danger' : 'warning'}
                      className={`text-capitalize ${r.status === 'Pendiente' ? 'text-dark' : 'text-white'}`}
                    >
                      {r.status}
                    </Badge>
                  </div>
                  {r.status === 'Pendiente' ? (
                    <div className="px-3">
                      <Button
                        onClick={openConfirmDeleteModal(r.id)}
                        variant="danger"
                        size="sm"
                        className="mt-2 mt-sm-0"
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : null}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ConfirmModal
              isOpen={isConfirmDeleteModalOpen}
              onConfirm={handleConfirmDelete}
              onClose={closeConfirmDeleteModal}
              title="Confirmar cancelación"
              body="Esta acción no se puede deshacer."
            />
            <SuccessModal
              isOpen={isSuccessDeleteModalOpen}
              onClose={closeSuccessDeleteModal}
              title="Cancelado"
              body="La reserva fue cancelada con éxito."
            />
          </>
        ) : (
          <div className="text-center mt-3 mb-5 text-muted">
            <h4>No se encontraron reservas registradas 📭</h4>
            <p>
              Cuando hagas una reserva, podrás verla reflejada aquí.<br />
              Explora alojamientos y reserva cuando estés listo.
            </p>
          </div>
        )
      ) : (
        <Container className="d-flex flex-row justify-content-center mt-5">
          <SimpleLoader />
        </Container>
      )}
    </Container>
  )
}
