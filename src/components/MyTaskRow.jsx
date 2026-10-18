import { FREQUENCY_LABELS, TIME_OF_DAY_LABELS } from '../api/labels';
import { isDone } from '../utils/progress';

export default function MyTaskRow({ task, big, justDone, busy, disabled, onComplete }) {
  const done = isDone(task);
  const className = ['my-task', big && 'big', done && 'done', justDone && 'just-done'].filter(Boolean).join(' ');
  const counter = task.periodLimit > 1 ? ` ${task.completionsInPeriod}/${task.periodLimit}` : '';

  return (
    <li className={className}>
      <span className="check" aria-hidden="true">
        {done ? '✓' : ''}
      </span>
      <div className="my-task-main">
        <h3>{task.description}</h3>
        <p>
          {TIME_OF_DAY_LABELS[task.timeOfDay]} · {FREQUENCY_LABELS[task.frequency]} · {task.estimatedMinutes} דקות ·
          ★ {task.pointsValue}
        </p>
      </div>
      <span className={done ? 'status status-done' : 'status status-wait'}>
        {done ? 'הושלם' : 'ממתין'}
        {counter}
      </span>
      {!done && (
        <button
          type="button"
          className="take-button done-button"
          disabled={disabled}
          onClick={() => onComplete(task.id)}
        >
          {busy ? 'שומר...' : 'ביצעתי!'}
        </button>
      )}
    </li>
  );
}
