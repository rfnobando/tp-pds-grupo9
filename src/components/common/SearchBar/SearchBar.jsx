const SearchBar = ({ value, onChange }) => (
  <form className="mb-3">
    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Buscar por destino"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </form>
);

export default SearchBar;
