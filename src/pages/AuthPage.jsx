import { useState } from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [notice, setNotice] = useState('');

  const showLoginWithNotice = (message) => {
    setNotice(message);
    setTab('login');
  };

  return (
    <main className="page">
      <section className="card">
        <Logo />
        <h1>משימות הבית</h1>
        <p className="subtitle">כל משימה במקומה, וכל נקודה נספרת.</p>

        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'login'} onClick={() => setTab('login')}>
            כניסה
          </button>
          <button type="button" role="tab" aria-selected={tab === 'register'} onClick={() => setTab('register')}>
            הרשמה
          </button>
        </div>

        {notice && tab === 'login' && <p className="notice">{notice}</p>}
        {tab === 'login' ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <RegisterForm onLogin={onLogin} onPending={showLoginWithNotice} />
        )}
      </section>
    </main>
  );
}
