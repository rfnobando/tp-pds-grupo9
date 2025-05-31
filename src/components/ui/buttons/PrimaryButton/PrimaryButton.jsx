import { Button } from 'react-bootstrap'
import styles from './PrimaryButton.module.css'

export const PrimaryButton = ({
  children,
  type = 'button',
  disabled = false,
  onClick = () => { },
  className = '',
  ...props
}) => {
  return (
    <Button
      {...props}
      type={type}
      disabled={disabled}
      variant="danger"
      onClick={onClick}
      className={[
        styles.button,
        disabled ? styles.disabled : '',
        className
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Button>
  )
}