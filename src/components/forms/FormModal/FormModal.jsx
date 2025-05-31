import { PrimaryButton } from '@/components/ui/buttons'
import { Button, Modal } from 'react-bootstrap'

export const FormModal = ({
  isOpen = false,
  onClose = () => { },
  title = '',
  children,
  submitButtonText = 'Enviar',
  disabledSubmitButton = false,
  onSubmit = () => { }
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          <PrimaryButton type="submit" disabled={disabledSubmitButton}>{submitButtonText}</PrimaryButton>
        </Modal.Footer>
      </form>
    </Modal>
  )
}