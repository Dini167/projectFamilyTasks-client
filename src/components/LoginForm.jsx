import { useState } from 'react';
import { login } from '../api/authApi';
import { getLastUserName, saveLastUserName, saveSession } from '../api/tokenStorage';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import TextField from './TextField';

export default function LoginForm({ onLogin, onForgotParentsPassword }) {
  const [userName, setUserName] = useState(getLastUserName);
  const [password, setPassword] = useState('');

  const { busy, errors, submit } = useSubmit(async () => {
    const session = await login({ userName, password });
    saveLastUserName(userName.trim());
    saveSession(session);
    onLogin(session);
  });

  return (
    <form onSubmit={submit}>
      <TextField
        label="שם משתמש"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        autoComplete="username"
      />
      <TextField
        label="סיסמה"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <FormErrors errors={errors} />
      <button type="submit" className="button" disabled={busy}>
        {busy ? 'מתחבר...' : 'כניסה'}
      </button>
      <button type="button" className="link-button back-link" onClick={onForgotParentsPassword}>
        שכחתי סיסמת הורים
      </button>
    </form>
  );
}
