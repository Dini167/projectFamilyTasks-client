export default function SelectField({ label, options, ...selectProps }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-box">
        <select {...selectProps}>
          {options.map((text, value) => (
            <option key={text} value={value}>
              {text}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
