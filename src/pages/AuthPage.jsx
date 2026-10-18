import { useState } from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Tabs from '../components/Tabs';

const TABS = [
  { key: 'login', label: 'כניסה' },
  { key: 'register', label: 'הרשמה' },
];

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

        <Tabs tabs={TABS} active={tab} onChange={setTab} />

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
