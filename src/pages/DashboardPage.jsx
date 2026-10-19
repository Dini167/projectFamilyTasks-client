import { useState } from 'react';
import { FREQUENCY_LABELS, ROUND_STATUS_LABELS, TIME_OF_DAY_LABELS } from '../api/labels';
import OverviewCards from '../components/OverviewCards';
import SelectField from '../components/SelectField';
import WeekGrid from '../components/WeekGrid';
import useCurrentRound from '../hooks/useCurrentRound';
import { STATUS_FILTERS, filterTasks, overview } from '../utils/dashboard';
import { isDone } from '../utils/progress';

const INITIAL_FILTERS = { childId: 'all', status: 'all', query: '' };

function TaskLine({ task }) {
  const done = isDone(task);
  const counter = task.periodLimit > 1 ? ` ${task.completionsInPeriod}/${task.periodLimit}` : '';

  return (
    <li className={done ? 'dash-task done' : 'dash-task'}>
      <div>
        <h5>{task.description}</h5>
        <p>
          {TIME_OF_DAY_LABELS[task.timeOfDay]} · {FREQUENCY_LABELS[task.frequency]} · ★ {task.pointsValue}
        </p>
      </div>
      <span className={done ? 'status status-done' : 'status status-wait'}>
        {done ? 'הושלם' : 'ממתין'}
        {counter}
      </span>
    </li>
  );
}

export default function DashboardPage() {
  const { summary, loaded, refresh } = useCurrentRound();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  if (!loaded) return <p className="empty">טוען את לוח הבקרה...</p>;
  if (!summary) return <p className="empty">אין סבב כרגע. אפשר לפתוח סבב בלשונית "הסבב הנוכחי".</p>;

  const change = (key) => (event) => setFilters({ ...filters, [key]: event.target.value });
  const childOptions = [
    { value: 'all', label: 'כל הילדים' },
    ...summary.children.map((child) => ({ value: String(child.childId), label: child.childName })),
  ];
  const groups = filterTasks(summary, filters).filter((child) => child.assignments.length > 0);

  return (
    <section>
      <div className="dash-head">
        <div>
          <h2>לוח בקרה</h2>
          <p className="subtitle">סבב {ROUND_STATUS_LABELS[summary.status]}</p>
        </div>
        <button type="button" className="link-button" onClick={refresh}>
          רענון
        </button>
      </div>
      <OverviewCards stats={overview(summary)} />
      <h3 className="dash-title">מבט שבועי: ביצועים לפי יום</h3>
      <WeekGrid rows={summary.children} />
      <h3 className="dash-title">מעקב משימות</h3>
      <div className="dash-filters">
        <SelectField label="ילד" options={childOptions} value={filters.childId} onChange={change('childId')} />
        <SelectField label="סטטוס" options={STATUS_FILTERS} value={filters.status} onChange={change('status')} />
        <label className="field">
          <span className="field-label">חיפוש משימה</span>
          <span className="field-box">
            <input type="search" value={filters.query} onChange={change('query')} placeholder="למשל: כלים" />
          </span>
        </label>
      </div>
      {groups.length === 0 && <p className="empty">אין משימות שמתאימות לסינון.</p>}
      {groups.map((child) => (
        <section key={child.childId} className="dash-child">
          <h4>
            {child.childName}
            <span>★ {child.pointsEarned} בסבב</span>
          </h4>
          <ul className="tasks">
            {child.assignments.map((task) => (
              <TaskLine key={task.id} task={task} />
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
