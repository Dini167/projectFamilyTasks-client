import { useState } from 'react';
import { completeAssignment } from '../api/assignmentsApi';
import FormErrors from '../components/FormErrors';
import MyTaskRow from '../components/MyTaskRow';
import ProgressBar from '../components/ProgressBar';
import Tabs from '../components/Tabs';
import useAssignments from '../hooks/useAssignments';
import useRowAction from '../hooks/useRowAction';
import { isDone, summarize, todayName } from '../utils/progress';

const MAX_PAGE_SIZE = 50;
const FILTERS = [
  { key: 'all', label: 'הכול' },
  { key: 'todo', label: 'להיום' },
  { key: 'done', label: 'הושלמו' },
];
const FILTER_RULES = {
  all: () => true,
  todo: (task) => !isDone(task),
  done: isDone,
};

export default function MyTasksPage({ onPointsChanged, big }) {
  const { items, totalCount, loading, errors, reload } = useAssignments('mine', MAX_PAGE_SIZE);
  const [filter, setFilter] = useState('all');
  const [notice, setNotice] = useState('');
  const [justDoneId, setJustDoneId] = useState(null);

  const complete = useRowAction(completeAssignment, {
    onSuccess: (completion) => {
      setNotice(`כל הכבוד! נוספו ${completion.pointsEarned} נקודות.`);
      setJustDoneId(completion.assignmentId);
      onPointsChanged();
    },
    onSettled: reload,
  });

  const run = (id) => {
    setNotice('');
    setJustDoneId(null);
    complete.run(id);
  };

  const progress = summarize(items);
  const visible = items.filter(FILTER_RULES[filter]);

  return (
    <section>
      <h2>המשימות שלי</h2>
      <p className="subtitle">{todayName()} · התכנון שלי להיום</p>
      {notice && <p className="notice">{notice}</p>}
      <FormErrors errors={errors} />
      <FormErrors errors={complete.errors} prominent={complete.conflict} />
      {loading && <p className="empty">טוען משימות...</p>}
      {!loading && !errors.length && totalCount === 0 && (
        <p className="empty">עדיין לא נבחרו משימות. אפשר לבחור מהלשונית "משימות פנויות".</p>
      )}
      {totalCount > 0 && (
        <>
          <ProgressBar title="ההתקדמות שלי היום" progress={progress.today} />
          <Tabs tabs={FILTERS} active={filter} onChange={setFilter} />
          <ul className="tasks">
            {visible.map((task) => (
              <MyTaskRow
                key={task.id}
                task={task}
                big={big}
                justDone={justDoneId === task.id}
                busy={complete.busyId === task.id}
                disabled={complete.busyId !== null}
                onComplete={run}
              />
            ))}
          </ul>
          {visible.length === 0 && <p className="empty">אין משימות להצגה בסינון הזה.</p>}
          <ProgressBar title="היעד השבועי שלי" progress={progress.week} />
        </>
      )}
    </section>
  );
}
