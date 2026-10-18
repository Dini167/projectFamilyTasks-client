import { useState } from 'react';
import { resetParentsPassword } from '../api/authApi';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import TextField from './TextField';

const MISMATCH = 'הסיסמה החדשה והאישור שלה אינם זהים.';
const DONE = 'סיסמת ההורים הוחלפה. אפשר להתחבר עם הסיסמה החדשה.';

export default function RecoverParentsPasswordForm({ onDone, onCancel }) {
  const [form, setForm] = useState({ recoveryKey: '', newPassword: '', confirm: '' });
  const [mismatch, setMismatch] = useState(false);
  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  const { busy, errors, submit } = useSubmit(async () => {
    const same = form.newPassword === form.confirm;
    setMismatch(!same);
    if (!same) return;
    await resetParentsPassword({ recoveryKey: form.recoveryKey, newPassword: form.newPassword });
    onDone(DONE);
  });

  return (
    <form onSubmit={submit}>
      <p className="subtitle">
        שחזור סיסמת הורים מצריך את מפתח החירום שהוגדר בשרת. את המפתח מקבל מי שמנהל את האתר.
      </p>
      <TextField label="מפתח החירום" type="password" autoComplete="off" {...bind('recoveryKey')} />
      <TextField
        label="סיסמת הורים חדשה"
        type="password"
        hint="לפחות 6 תווים"
        autoComplete="new-password"
        {...bind('newPassword')}
      />
      <TextField label="אישור הסיסמה החדשה" type="password" autoComplete="new-password" {...bind('confirm')} />
      <FormErrors errors={mismatch ? [MISMATCH] : errors} />
      <button type="submit" className="button" disabled={busy}>
        {busy ? 'שומר...' : 'החלפת סיסמת ההורים'}
      </button>
      <button type="button" className="link-button back-link" onClick={onCancel}>
        חזרה לכניסה
      </button>
    </form>
  );
}
