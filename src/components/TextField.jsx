import { useState } from 'react';

export default function TextField({ label, hint, type = 'text', ...inputProps }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';

  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-box">
        <input {...inputProps} type={isPassword && visible ? 'text' : type} required />
        {isPassword && (
          <button type="button" className="link-button" onClick={() => setVisible(!visible)}>
            {visible ? 'הסתרה' : 'הצגה'}
          </button>
        )}
      </span>
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}
