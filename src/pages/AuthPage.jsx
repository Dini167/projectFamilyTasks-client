import { useState } from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import RecoverParentsPasswordForm from '../components/RecoverParentsPasswordForm';
import RegisterForm from '../components/RegisterForm';
import Tabs from '../components/Tabs';

const TABS = [
  { key: 'login', label: 'כניסה' },
  { key: 'register', label: 'הרשמה' },
];

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [recovering, setRecovering] = useState(false);
  const [notice, setNotice] = useState('');

  const showLoginWithNotice = (message) => {
    setNotice(message);
    setRecovering(false);
    setTab('login');
  };

  const renderForm = () => {
    if (recovering) {
      return <RecoverParentsPasswordForm onDone={showLoginWithNotice} onCancel={() => setRecovering(false)} />;
    }
    return (
      <>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        {notice && tab === 'login' && <p className="notice">{notice}</p>}
        {tab === 'login' ? (
          <LoginForm onLogin={onLogin} onForgotParentsPassword={() => setRecovering(true)} />
        ) : (
          <RegisterForm onLogin={onLogin} />
        )}
      </>
    );
  };

  return (
    <main className="page">
      <section className="card">
        <Logo />
        <h1>משימות הבית</h1>
        <p className="subtitle">כל משימה במקומה, וכל נקודה נספרת.</p>
        {renderForm()}
      </section>
    </main>
  );
}
