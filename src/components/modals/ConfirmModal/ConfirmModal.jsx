import { PrimaryButton } from '@/components/ui/buttons'
import { Modal, Button } from 'react-bootstrap'
import { ExclamationCircleFill } from 'react-bootstrap-icons'

export const ConfirmModal = ({ isOpen, onConfirm, onClose, title, body }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Body className="text-center py-5">
        <ExclamationCircleFill size={75} className="text-warning mb-3" />
        <h4 className="fw-semibold">{title}</h4>
        <p className="text-muted">{body}</p>
        <div className="d-flex justify-content-center mt-4">
          <PrimaryButton className="me-2" onClick={onConfirm} >
            Confirmar
          </PrimaryButton>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
