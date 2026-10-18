import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import TaskCard from '../components/TaskCard';
import useAssignments from '../hooks/useAssignments';

export default function AvailableTasksPage() {
  const { items, totalCount, page, setPage, pageCount, loading, errors } = useAssignments('available');

  return (
    <section>
      <h2>משימות פנויות</h2>
      <p className="subtitle">{totalCount} משימות מתאימות לגיל ממתינות לבחירה.</p>
      <FormErrors errors={errors} />
      {loading && <p className="empty">טוען משימות...</p>}
      {!loading && !errors.length && totalCount === 0 && (
        <p className="empty">אין כרגע משימות פנויות. ייתכן שהסבב עדיין לא נפתח.</p>
      )}
      <ul className="tasks">
        {items.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
