import { useState } from 'react';
import { takeAssignment } from '../api/assignmentsApi';
import { getErrorMessages, isConflict } from '../api/errors';
import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import TaskCard from '../components/TaskCard';
import useAssignments from '../hooks/useAssignments';

export default function AvailableTasksPage() {
  const { items, totalCount, page, setPage, pageCount, loading, errors, reload } = useAssignments('available');
  const [takingId, setTakingId] = useState(null);
  const [takeErrors, setTakeErrors] = useState([]);
  const [conflict, setConflict] = useState(false);

  const take = async (id) => {
    setTakingId(id);
    setTakeErrors([]);
    try {
      await takeAssignment(id);
      if (items.length === 1 && page > 1) setPage(page - 1);
    } catch (error) {
      setTakeErrors(getErrorMessages(error));
      setConflict(isConflict(error));
    } finally {
      setTakingId(null);
      reload();
    }
  };

  return (
    <section>
      <h2>משימות פנויות</h2>
      <p className="subtitle">{totalCount} משימות מתאימות לגיל ממתינות לבחירה.</p>
      <FormErrors errors={errors} />
      <FormErrors errors={takeErrors} prominent={conflict} />
      {loading && <p className="empty">טוען משימות...</p>}
      {!loading && !errors.length && totalCount === 0 && (
        <p className="empty">אין כרגע משימות פנויות לגיל זה.</p>
      )}
      <ul className="tasks">
        {items.map((task) => (
          <TaskCard key={task.id} task={task}>
            <button type="button" className="take-button" disabled={takingId !== null} onClick={() => take(task.id)}>
              {takingId === task.id ? 'שומר...' : 'אני לוקח/ת'}
            </button>
          </TaskCard>
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
