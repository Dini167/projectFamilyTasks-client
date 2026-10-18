import { FREQUENCY_LABELS, TIME_OF_DAY_LABELS } from '../api/labels';

export default function TaskCard({ task, children }) {
  return (
    <li className="task">
      <div className="task-main">
        <h3>{task.description}</h3>
        <p className="chips">
          <span>{TIME_OF_DAY_LABELS[task.timeOfDay]}</span>
          <span>{FREQUENCY_LABELS[task.frequency]}</span>
          <span>{task.estimatedMinutes} דקות</span>
          {task.categories?.map((category) => (
            <span key={category.id} className="category-chip">
              {category.name}
            </span>
          ))}
        </p>
      </div>
      <div className="task-side">
        <span className="points">★ {task.pointsValue}</span>
        {children}
      </div>
    </li>
  );
}
