import { useState } from 'react';
import { registerChild, registerParent } from '../api/authApi';
import { saveLastUserName, saveSession } from '../api/tokenStorage';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import TextField from './TextField';

const PENDING_NOTICE = 'ההרשמה התקבלה. החשבון ממתין לאישור של אחד ההורים, ואחריו אפשר להתחבר.';
const EMPTY_FORM = { name: '', userName: '', password: '', age: '', parentsPassword: '' };

export default function RegisterForm({ onLogin, onPending }) {
  const [isParent, setIsParent] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  const registerAsParent = async () => {
    const { name, userName, parentsPassword } = form;
    const session = await registerParent({ name, userName, parentsPassword });
    saveSession(session);
    onLogin(session);
  };

  const registerAsChild = async () => {
    const { name, userName, password, age } = form;
    await registerChild({ name, userName, password, age: Number(age) });
    onPending(PENDING_NOTICE);
  };

  const { busy, errors, submit } = useSubmit(async () => {
    await (isParent ? registerAsParent() : registerAsChild());
    saveLastUserName(form.userName.trim());
  });

  return (
    <form onSubmit={submit}>
      <div className="choice" role="group" aria-label="סוג החשבון">
        <button type="button" aria-pressed={!isParent} onClick={() => setIsParent(false)}>
          ילד/ה
        </button>
        <button type="button" aria-pressed={isParent} onClick={() => setIsParent(true)}>
          הורה
        </button>
      </div>
      <TextField label="שם" {...bind('name')} autoComplete="name" />
      <TextField
        label="שם משתמש"
        hint="3 עד 30 תווים, מומלץ באנגלית"
        {...bind('userName')}
        autoComplete="username"
      />
      {isParent ? (
        <TextField label="סיסמת ההורים" type="password" {...bind('parentsPassword')} autoComplete="off" />
      ) : (
        <>
          <TextField
            label="סיסמה"
            type="password"
            hint="לפחות 6 תווים"
            {...bind('password')}
            autoComplete="new-password"
          />
          <TextField label="גיל" type="number" min="1" max="20" {...bind('age')} />
        </>
      )}
      <FormErrors errors={errors} />
      <button type="submit" className="button" disabled={busy}>
        {busy ? 'שולח...' : 'הרשמה'}
      </button>
    </form>
  );
}
