import { Form } from "react-bootstrap"

export const SearchBar = ({ value, onChange }) => (
  <div className="mb-3">
    <Form.Control
      type="text"
      className="form-control form-control-lg"
      placeholder="Buscar destino"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
)
