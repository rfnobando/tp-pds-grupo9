import { Image } from 'react-bootstrap'
import styles from './ResponsiveThumbnail.module.css'

export const ResponsiveThumbnail = ({ className, ...props }) => {
  return (
    <Image
      thumbnail={true}
      className={[
        styles.image,
        className
      ].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
