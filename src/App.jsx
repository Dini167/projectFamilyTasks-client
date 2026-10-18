import { useState } from 'react';
import { ROLES } from './api/labels';
import { clearSession, getSession } from './api/tokenStorage';
import Logo from './components/Logo';
import AuthPage from './pages/AuthPage';
import ChildHome from './pages/ChildHome';
import ManageTasksPage from './pages/ManageTasksPage';

export default function App() {
  const [session, setSession] = useState(getSession);

  const logout = () => {
    clearSession();
    setSession(null);
  };

  if (!session) return <AuthPage onLogin={setSession} />;

  return (
    <div className="app">
      <header className="topbar">
        <Logo size={40} />
        <strong>שלום {session.name}</strong>
        <button type="button" className="link-button" onClick={logout}>
          התנתקות
        </button>
      </header>
      <main className="content">
        {session.role === ROLES.child ? <ChildHome /> : <ManageTasksPage />}
      </main>
    </div>
  );
}
