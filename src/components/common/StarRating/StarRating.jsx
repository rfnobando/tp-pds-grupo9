import { StarFill, Star } from 'react-bootstrap-icons'
import styles from './StarRating.module.css'

const possibleValues = [1, 2, 3, 4, 5]

export const StarRating = ({ rating, onChange }) => {
  return (
    <div>
      {possibleValues.map((starQuantity) => (
        <span
          key={starQuantity}
          onClick={onChange(starQuantity)}
          className={[
            styles.star,
            starQuantity <= rating ? styles.filled : styles.empty
          ].join(' ')}
        >
          {starQuantity <= rating ? <StarFill /> : <Star />}
        </span>
      ))}
    </div>
  )
}
