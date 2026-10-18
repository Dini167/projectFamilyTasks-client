import { useEffect, useState } from 'react';
import { getErrorMessages } from '../api/errors';
import { deleteTask, getCategories, getTasks } from '../api/tasksApi';
import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import usePagedList from '../hooks/usePagedList';

const PAGE_SIZE = 8;

export default function ManageTasksPage() {
  const { items, totalCount, page, setPage, pageCount, loading, errors, reload } = usePagedList(getTasks, PAGE_SIZE);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);
  const [deleteErrors, setDeleteErrors] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const closeForm = () => setEditing(null);
  const saved = () => {
    closeForm();
    reload();
  };

  const remove = async (task) => {
    setDeleteErrors([]);
    try {
      await deleteTask(task.id);
      if (items.length === 1 && page > 1) setPage(page - 1);
    } catch (error) {
      setDeleteErrors(getErrorMessages(error));
    } finally {
      setConfirmingId(null);
      reload();
    }
  };

  const renderForm = (task) => (
    <TaskForm task={task} categories={categories} onSaved={saved} onCancel={closeForm} />
  );

  const renderActions = (task) =>
    confirmingId === task.id ? (
      <div className="confirm">
        <button type="button" className="danger-button" onClick={() => remove(task)}>
          מחיקה סופית
        </button>
        <button type="button" className="link-button" onClick={() => setConfirmingId(null)}>
          ביטול
        </button>
      </div>
    ) : (
      <div className="confirm">
        <button type="button" className="link-button" onClick={() => setEditing(task)}>
          עריכה
        </button>
        <button type="button" className="link-button" onClick={() => setConfirmingId(task.id)}>
          מחיקה
        </button>
      </div>
    );

  const renderTask = (task) =>
    editing?.id === task.id ? (
      <li key={task.id}>{renderForm(task)}</li>
    ) : (
      <TaskCard key={task.id} task={task}>
        {renderActions(task)}
      </TaskCard>
    );

  return (
    <section>
      <div className="heading">
        <h2>ניהול משימות</h2>
        <button type="button" className="take-button" onClick={() => setEditing({})}>
          הוספת משימה
        </button>
      </div>
      <p className="subtitle">{totalCount} משימות במערכת. הילדים רואים את המשימות המתאימות לגילם.</p>
      {editing && !editing.id && renderForm(null)}
      <FormErrors errors={errors} />
      <FormErrors errors={deleteErrors} prominent />
      {loading && <p className="empty">טוען משימות...</p>}
      <ul className="tasks">{items.map(renderTask)}</ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
