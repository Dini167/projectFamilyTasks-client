import { progressMessage } from '../utils/progress';

export default function ProgressBar({ title, progress }) {
  const { done, total } = progress;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="progress-card">
      <div className="progress-head">
        <h3>{title}</h3>
        <strong>
          {done} מתוך {total}
        </strong>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-note">{progressMessage(progress)}</p>
    </div>
  );
}
