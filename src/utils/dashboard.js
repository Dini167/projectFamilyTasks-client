import { isDone } from './progress';

export const DAY_LABELS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

export const STATUS_FILTERS = [
  { value: 'all', label: 'כל הסטטוסים' },
  { value: 'pending', label: 'ממתינות' },
  { value: 'done', label: 'הושלמו' },
];

const sum = (numbers) => numbers.reduce((total, value) => total + value, 0);

export const overview = (summary) => {
  const assignments = summary.children.flatMap((child) => child.assignments);
  return {
    children: summary.children.length,
    doneThisWeek: sum(summary.children.map((child) => sum(child.completionsByDay))),
    pending: assignments.filter((task) => !isDone(task)).length,
    free: summary.unassignedTasks.length,
  };
};

const matchesStatus = (task, status) => status === 'all' || (status === 'done') === isDone(task);

export const filterTasks = (summary, { childId, status, query }) => {
  const text = query.trim();
  return summary.children
    .filter((child) => childId === 'all' || String(child.childId) === childId)
    .map((child) => ({
      ...child,
      assignments: child.assignments.filter(
        (task) => matchesStatus(task, status) && task.description.includes(text),
      ),
    }));
};
