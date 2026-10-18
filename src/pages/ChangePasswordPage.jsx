import { useState } from 'react';
import { changeParentsPassword } from '../api/authApi';
import FormErrors from '../components/FormErrors';
import TextField from '../components/TextField';
import useSubmit from '../hooks/useSubmit';

const MISMATCH = 'הסיסמה החדשה והאישור שלה אינם זהים.';

export default function ChangePasswordPage({ forced, onDone, onCancel }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [mismatch, setMismatch] = useState(false);
  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  const { busy, errors, submit } = useSubmit(async () => {
    const same = form.newPassword === form.confirm;
    setMismatch(!same);
    if (!same) return;
    await changeParentsPassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
    onDone();
  });

  return (
    <form className="panel" onSubmit={submit}>
      <h3>החלפת סיסמת הורים</h3>
      <p className="subtitle">
        {forced
          ? 'זו כניסה ראשונה עם הסיסמה ההתחלתית. יש להחליף אותה כדי להמשיך.'
          : 'הסיסמה משותפת לכל ההורים. לאחר ההחלפה כל ההורים ייכנסו איתה.'}
      </p>
      <TextField label="הסיסמה הנוכחית" type="password" autoComplete="current-password" {...bind('currentPassword')} />
      <TextField
        label="הסיסמה החדשה"
        type="password"
        hint="לפחות 6 תווים"
        autoComplete="new-password"
        {...bind('newPassword')}
      />
      <TextField label="אישור הסיסמה החדשה" type="password" autoComplete="new-password" {...bind('confirm')} />
      <FormErrors errors={mismatch ? [MISMATCH] : errors} />
      <div className="row">
        <button type="submit" className="button" disabled={busy}>
          {busy ? 'שומר...' : 'החלפת סיסמה'}
        </button>
        {!forced && (
          <button type="button" className="button secondary" onClick={onCancel}>
            ביטול
          </button>
        )}
      </div>
    </form>
  );
}
