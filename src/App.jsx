import { useState } from 'react';
import { clearSession, getSession } from './api/tokenStorage';
import AuthPage from './pages/AuthPage';
import Logo from './components/Logo';

export default function App() {
  const [session, setSession] = useState(getSession);

  const logout = () => {
    clearSession();
    setSession(null);
  };

  if (!session) return <AuthPage onLogin={setSession} />;

  return (
    <main className="page">
      <section className="card">
        <Logo />
        <h1>שלום {session.name}</h1>
        <p className="subtitle">ההתחברות הצליחה. מסכי המשימות ייבנו במשימות הבאות.</p>
        <button type="button" className="button secondary" onClick={logout}>
          התנתקות
        </button>
      </section>
    </main>
  );
}
