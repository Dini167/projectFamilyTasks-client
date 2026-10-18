import { SWAP_STATUS_LABELS } from '../api/labels';

const formatTime = (value) => new Date(value).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });

export default function SwapCard({ swap, children }) {
  const { requesterAssignment: from, targetAssignment: to } = swap;

  return (
    <li className="task">
      <div className="task-main">
        <h3>
          {from.childName}: {from.description}
        </h3>
        <h3>
          ⇄ {to.childName}: {to.description}
        </h3>
        <p className="chips">
          <span className="category-chip">{SWAP_STATUS_LABELS[swap.status]}</span>
          <span>{formatTime(swap.createdAt)}</span>
        </p>
      </div>
      <div className="task-side">{children}</div>
    </li>
  );
}
