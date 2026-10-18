const DAILY = 0;

export const isDone = (task) => task.completionsInPeriod >= task.periodLimit;

const countProgress = (tasks) => ({ done: tasks.filter(isDone).length, total: tasks.length });

export const summarize = (tasks) => ({
  today: countProgress(tasks.filter((task) => task.frequency === DAILY)),
  week: countProgress(tasks.filter((task) => task.frequency !== DAILY)),
});

export const progressMessage = ({ done, total }) => {
  if (total === 0) return 'אין משימות כאלה בסבב הנוכחי.';
  if (done === total) return 'כל הכבוד, הכול הושלם!';
  const left = total - done;
  return `התקדמות יפה, נשארו עוד ${left} ${left === 1 ? 'משימה' : 'משימות'}.`;
};

export const todayName = () => new Date().toLocaleDateString('he-IL', { weekday: 'long' });
