const toOption = (option, index) =>
  typeof option === 'string' ? { value: index, label: option } : option;

export default function SelectField({ label, options, ...selectProps }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-box">
        <select {...selectProps}>
          {options.map(toOption).map(({ value, label: text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
