import { useState } from 'react';
import { ROLES } from './api/labels';
import { clearSession, getSession, saveSession } from './api/tokenStorage';
import Logo from './components/Logo';
import AuthPage from './pages/AuthPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ChildHome from './pages/ChildHome';
import ParentHome from './pages/ParentHome';

export default function App() {
  const [session, setSession] = useState(getSession);
  const [changingPassword, setChangingPassword] = useState(false);

  const logout = () => {
    clearSession();
    setSession(null);
    setChangingPassword(false);
  };

  const passwordChanged = () => {
    const updated = { ...session, mustChangePassword: false };
    saveSession(updated);
    setSession(updated);
    setChangingPassword(false);
  };

  if (!session) return <AuthPage onLogin={setSession} />;

  const isParent = session.role === ROLES.parent;
  const mustChange = isParent && session.mustChangePassword;

  const renderContent = () => {
    if (mustChange || changingPassword) {
      return (
        <ChangePasswordPage
          forced={mustChange}
          onDone={passwordChanged}
          onCancel={() => setChangingPassword(false)}
        />
      );
    }
    return isParent ? <ParentHome /> : <ChildHome />;
  };

  return (
    <div className="app">
      <header className="topbar">
        <Logo size={40} />
        <strong>שלום {session.name}</strong>
        {isParent && !mustChange && (
          <button type="button" className="link-button" onClick={() => setChangingPassword(true)}>
            החלפת סיסמה
          </button>
        )}
        <button type="button" className="link-button" onClick={logout}>
          התנתקות
        </button>
      </header>
      <main className="content">{renderContent()}</main>
    </div>
  );
}
