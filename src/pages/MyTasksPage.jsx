import { useState } from 'react';
import { completeAssignment } from '../api/assignmentsApi';
import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import TaskCard from '../components/TaskCard';
import useAssignments from '../hooks/useAssignments';
import useRowAction from '../hooks/useRowAction';

export default function MyTasksPage({ onPointsChanged }) {
  const { items, totalCount, page, setPage, pageCount, loading, errors, reload } = useAssignments('mine');
  const [notice, setNotice] = useState('');

  const complete = useRowAction(completeAssignment, {
    onSuccess: (completion) => {
      setNotice(`כל הכבוד! נוספו ${completion.pointsEarned} נקודות.`);
      onPointsChanged();
    },
    onSettled: reload,
  });

  const run = (id) => {
    setNotice('');
    complete.run(id);
  };

  return (
    <section>
      <h2>המשימות שלי</h2>
      <p className="subtitle">{totalCount} משימות נבחרו בסבב הנוכחי.</p>
      {notice && <p className="notice">{notice}</p>}
      <FormErrors errors={errors} />
      <FormErrors errors={complete.errors} prominent={complete.conflict} />
      {loading && <p className="empty">טוען משימות...</p>}
      {!loading && !errors.length && totalCount === 0 && (
        <p className="empty">עדיין לא נבחרו משימות. אפשר לבחור מהלשונית "משימות פנויות".</p>
      )}
      <ul className="tasks">
        {items.map((task) => (
          <TaskCard key={task.id} task={task}>
            <button
              type="button"
              className="take-button"
              disabled={complete.busyId !== null}
              onClick={() => run(task.id)}
            >
              {complete.busyId === task.id ? 'שומר...' : 'ביצעתי!'}
            </button>
          </TaskCard>
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
