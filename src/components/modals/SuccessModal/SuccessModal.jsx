import { Modal, Button } from 'react-bootstrap'
import { CheckCircleFill } from 'react-bootstrap-icons'

export const SuccessModal = ({ isOpen, onClose, title, body }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Body className="text-center py-5">
        <CheckCircleFill size={75} className="text-success mb-3" />
        <h4 className="fw-semibold">{title}</h4>
        <p className="text-muted">{body}</p>
        <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
