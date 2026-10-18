import { takeAssignment } from '../api/assignmentsApi';
import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import TaskCard from '../components/TaskCard';
import useAssignments from '../hooks/useAssignments';
import useRowAction from '../hooks/useRowAction';

export default function AvailableTasksPage() {
  const { items, totalCount, page, setPage, pageCount, loading, errors, reload } = useAssignments('available');

  const take = useRowAction(takeAssignment, {
    onSuccess: () => items.length === 1 && page > 1 && setPage(page - 1),
    onSettled: reload,
  });

  return (
    <section>
      <h2>משימות פנויות</h2>
      <p className="subtitle">{totalCount} משימות מתאימות לגיל ממתינות לבחירה.</p>
      <FormErrors errors={errors} />
      <FormErrors errors={take.errors} prominent={take.conflict} />
      {loading && <p className="empty">טוען משימות...</p>}
      {!loading && !errors.length && totalCount === 0 && (
        <p className="empty">אין כרגע משימות פנויות לגיל זה.</p>
      )}
      <ul className="tasks">
        {items.map((task) => (
          <TaskCard key={task.id} task={task}>
            <button
              type="button"
              className="take-button"
              disabled={take.busyId !== null}
              onClick={() => take.run(task.id)}
            >
              {take.busyId === task.id ? 'שומר...' : 'אני לוקח/ת'}
            </button>
          </TaskCard>
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
