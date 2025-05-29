import { Modal, Button } from 'react-bootstrap'

export const SuccessModal = ({ isOpen, onClose, title, body }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
