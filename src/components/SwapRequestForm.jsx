import { useEffect, useState } from 'react';
import { getAssignments } from '../api/assignmentsApi';
import { createSwap } from '../api/swapsApi';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import SelectField from './SelectField';

const LIST_SIZE = 50;

const toOption = (assignment, prefix = '') => ({
  value: assignment.id,
  label: `${prefix}${assignment.description}`,
});

function SwapFields({ mine, siblings, onCreated, onCancel }) {
  const [mineId, setMineId] = useState(mine[0].value);
  const [targetId, setTargetId] = useState(siblings[0].value);

  const { busy, errors, submit } = useSubmit(async () => {
    await createSwap(mineId, targetId);
    onCreated();
  });

  return (
    <form className="panel" onSubmit={submit}>
      <h3>בקשת החלפה</h3>
      <SelectField
        label="המשימה שלי להחלפה"
        options={mine}
        value={mineId}
        onChange={(e) => setMineId(Number(e.target.value))}
      />
      <SelectField
        label="המשימה של האח שאני רוצה"
        options={siblings}
        value={targetId}
        onChange={(e) => setTargetId(Number(e.target.value))}
      />
      <p className="subtitle">האח צריך לאשר, ואחריו ההורה. המשימות מתחלפות רק אחרי אישור ההורה.</p>
      <FormErrors errors={errors} prominent />
      <div className="row">
        <button type="submit" className="button" disabled={busy}>
          {busy ? 'שולח...' : 'שליחת הבקשה'}
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          ביטול
        </button>
      </div>
    </form>
  );
}

export default function SwapRequestForm({ onCreated, onCancel }) {
  const [choices, setChoices] = useState(null);

  useEffect(() => {
    let ignore = false;
    Promise.all([getAssignments('mine', 1, LIST_SIZE), getAssignments('siblings', 1, LIST_SIZE)]).then(
      ([mine, siblings]) => {
        if (ignore) return;
        setChoices({
          mine: mine.items.map((assignment) => toOption(assignment)),
          siblings: siblings.items.map((assignment) => toOption(assignment, `${assignment.childName}: `)),
        });
      },
    );
    return () => {
      ignore = true;
    };
  }, []);

  if (!choices) return <p className="empty">טוען...</p>;
  if (!choices.mine.length || !choices.siblings.length) {
    return <p className="notice">כדי לבקש החלפה צריך שיהיו משימות שנבחרו אצלך וגם אצל אח.</p>;
  }

  return <SwapFields {...choices} onCreated={onCreated} onCancel={onCancel} />;
}
