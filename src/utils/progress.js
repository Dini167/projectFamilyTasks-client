const DAILY = 0;
const TASK_UNITS = ['משימה', 'משימות'];
const RUN_UNITS = ['ביצוע', 'ביצועים'];

export const isDone = (task) => task.completionsInPeriod >= task.periodLimit;

const sum = (tasks, pick) => tasks.reduce((total, task) => total + pick(task), 0);

const dailyProgress = (tasks) => ({ done: tasks.filter(isDone).length, total: tasks.length, units: TASK_UNITS });

const weeklyProgress = (tasks) => ({
  done: sum(tasks, (task) => Math.min(task.completionsInPeriod, task.periodLimit)),
  total: sum(tasks, (task) => task.periodLimit),
  units: RUN_UNITS,
});

export const summarize = (tasks) => ({
  today: dailyProgress(tasks.filter((task) => task.frequency === DAILY)),
  week: weeklyProgress(tasks.filter((task) => task.frequency !== DAILY)),
});

export const progressMessage = ({ done, total, units }) => {
  if (total === 0) return 'אין כאלה בסבב הנוכחי.';
  if (done === total) return 'כל הכבוד, הכול הושלם!';
  const left = total - done;
  return `התקדמות יפה, נשארו עוד ${left} ${left === 1 ? units[0] : units[1]}.`;
};

export const todayName = () => new Date().toLocaleDateString('he-IL', { weekday: 'long' });
