import { useState } from 'react';
import { approveChild, deleteChild, resetChildPassword } from '../api/childrenApi';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import TextField from './TextField';

function ResetPasswordForm({ child, onDone, onCancel }) {
  const [password, setPassword] = useState('');
  const { busy, errors, submit } = useSubmit(async () => {
    await resetChildPassword(child.id, password);
    onDone(`הסיסמה של ${child.name} עודכנה. יש למסור אותה לילד.`);
  });

  return (
    <form className="inline-form" onSubmit={submit}>
      <TextField
        label={`סיסמה חדשה ל${child.name}`}
        type="password"
        hint="6 עד 50 תווים"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormErrors errors={errors} />
      <div className="row">
        <button type="submit" className="button" disabled={busy}>
          {busy ? 'שומר...' : 'שמירת הסיסמה'}
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          ביטול
        </button>
      </div>
    </form>
  );
}

export default function ChildCard({ child, onChanged, onNotice }) {
  const [mode, setMode] = useState(null);
  const approve = useSubmit(async () => {
    await approveChild(child.id);
    onChanged();
  });
  const remove = useSubmit(async () => {
    await deleteChild(child.id);
    onChanged();
  });

  const finishReset = (message) => {
    setMode(null);
    onNotice(message);
  };

  const renderActions = () =>
    mode === 'delete' ? (
      <div className="confirm">
        <button type="button" className="danger-button" disabled={remove.busy} onClick={remove.submit}>
          הסרה סופית
        </button>
        <button type="button" className="link-button" onClick={() => setMode(null)}>
          ביטול
        </button>
      </div>
    ) : (
      <div className="confirm">
        {!child.isApproved && (
          <button type="button" className="take-button" disabled={approve.busy} onClick={approve.submit}>
            אישור
          </button>
        )}
        <button type="button" className="link-button" onClick={() => setMode('password')}>
          איפוס סיסמה
        </button>
        <button type="button" className="link-button" onClick={() => setMode('delete')}>
          הסרה
        </button>
      </div>
    );

  return (
    <li className="child-item">
      <div className="task">
        <div className="task-main">
          <h3>{child.name}</h3>
          <p className="chips">
            <span>שם משתמש: {child.userName}</span>
            <span>גיל {child.age}</span>
            {!child.isApproved && <span className="category-chip">ממתין לאישור</span>}
          </p>
        </div>
        <div className="task-side">
          <span className="points">★ {child.pointsBalance}</span>
          {renderActions()}
        </div>
      </div>
      <FormErrors errors={approve.errors} prominent />
      <FormErrors errors={remove.errors} prominent />
      {mode === 'password' && (
        <ResetPasswordForm child={child} onDone={finishReset} onCancel={() => setMode(null)} />
      )}
    </li>
  );
}
