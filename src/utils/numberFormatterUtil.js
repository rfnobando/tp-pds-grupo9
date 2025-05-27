export const formatNumberToARS = (value) => {
  const floatValue = parseFloat(value)
  return typeof floatValue === 'number' && !isNaN(floatValue) && isFinite(floatValue)
    ? new Intl.NumberFormat("es-AR", { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(floatValue)
    : '0,00'
}
