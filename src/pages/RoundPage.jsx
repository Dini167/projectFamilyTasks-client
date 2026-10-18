import { useState } from 'react';
import { ROUND_STATUS, ROUND_STATUS_LABELS } from '../api/labels';
import { openRound, setRoundStatus } from '../api/roundsApi';
import FormErrors from '../components/FormErrors';
import TextField from '../components/TextField';
import useCurrentRound from '../hooks/useCurrentRound';
import useSubmit from '../hooks/useSubmit';

const STATUS_HINTS = [
  'הילדים בוחרים כעת משימות. אחרי שכולם בחרו אפשר להתחיל את הסבב.',
  'הבחירה נסגרה. הילדים מסמנים ביצוע ומצטברות נקודות.',
];

function OpenRoundForm({ onOpened }) {
  const [quota, setQuota] = useState(3);
  const { busy, errors, submit } = useSubmit(async () => {
    await openRound(Number(quota));
    onOpened();
  });

  return (
    <form className="panel" onSubmit={submit}>
      <h3>פתיחת סבב חדש</h3>
      <p className="subtitle">אין כרגע סבב פתוח. עם הפתיחה הילדים יוכלו לבחור משימות לפי גילם.</p>
      <TextField
        label="מכסת משימות לכל ילד"
        type="number"
        min="1"
        max="20"
        value={quota}
        onChange={(e) => setQuota(e.target.value)}
      />
      <FormErrors errors={errors} />
      <button type="submit" className="button" disabled={busy}>
        {busy ? 'פותח...' : 'פתיחת סבב'}
      </button>
    </form>
  );
}

function ChildSummaryRow({ child, quota }) {
  return (
    <li className="task">
      <div className="task-main">
        <h3>{child.childName}</h3>
        <p className="chips">
          <span>
            נבחרו {child.assignments.length} מתוך {quota}
          </span>
          <span>בוצעו {child.completionsCount}</span>
        </p>
      </div>
      <span className="points">★ {child.pointsEarned}</span>
    </li>
  );
}

export default function RoundPage() {
  const { summary, roundId, loaded, refresh } = useCurrentRound();
  const [confirmingClose, setConfirmingClose] = useState(false);

  const changeStatus = (status) => async () => {
    await setRoundStatus(roundId, status);
    setConfirmingClose(false);
    refresh();
  };
  const activate = useSubmit(changeStatus(ROUND_STATUS.active));
  const close = useSubmit(changeStatus(ROUND_STATUS.closed));

  if (!loaded) return <p className="empty">טוען...</p>;
  if (!summary) return <OpenRoundForm onOpened={refresh} />;

  return (
    <section>
      <h2>הסבב הנוכחי</h2>
      <p className="balance">
        <span>
          {ROUND_STATUS_LABELS[summary.status]} | מכסה: {summary.tasksQuotaPerChild} משימות לילד
        </span>
        <strong>{summary.unassignedTasks.length} פנויות</strong>
      </p>
      <p className="subtitle">{STATUS_HINTS[summary.status]}</p>
      <FormErrors errors={activate.errors} prominent />
      <FormErrors errors={close.errors} prominent />
      <div className="row">
        {summary.status === ROUND_STATUS.open && (
          <button type="button" className="button" disabled={activate.busy} onClick={activate.submit}>
            התחלת הסבב (סגירת הבחירה)
          </button>
        )}
        {confirmingClose ? (
          <>
            <button type="button" className="danger-button" disabled={close.busy} onClick={close.submit}>
              סגירה סופית של הסבב
            </button>
            <button type="button" className="button secondary" onClick={() => setConfirmingClose(false)}>
              ביטול
            </button>
          </>
        ) : (
          <button type="button" className="button secondary" onClick={() => setConfirmingClose(true)}>
            סגירת הסבב
          </button>
        )}
      </div>
      <h3 className="section-title">מצב הילדים</h3>
      <ul className="tasks">
        {summary.children.map((child) => (
          <ChildSummaryRow key={child.childId} child={child} quota={summary.tasksQuotaPerChild} />
        ))}
      </ul>
    </section>
  );
}
