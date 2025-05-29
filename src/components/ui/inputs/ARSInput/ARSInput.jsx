import { NumericFormat } from 'react-number-format'

export const ARSInput = ({
  className = '',
  value = '',
  onValueChange = () => { },
  prefix = '',
  min,
  max,
  ...props
}) => {
  return (
    <NumericFormat
      className={className}
      value={value}
      onValueChange={onValueChange}
      allowNegative={false}
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator="."
      prefix={prefix}
      isAllowed={({ floatValue }) =>
        floatValue === undefined
        || (
          (min === undefined || floatValue >= min)
          && (max === undefined || floatValue <= max)
        )
      }
      {...props}
    />
  )
}