import { DAY_LABELS } from '../utils/dashboard';

const todayIndex = () => new Date().getDay();

const level = (count) => (count === 0 ? 'zero' : count < 3 ? 'low' : 'high');

export default function WeekGrid({ rows }) {
  const today = todayIndex();

  return (
    <div className="week-wrap">
      <table className="week-grid">
        <thead>
          <tr>
            <th scope="col">ילד</th>
            {DAY_LABELS.map((label, index) => (
              <th key={label} scope="col" className={index === today ? 'today' : undefined}>
                {label}
              </th>
            ))}
            <th scope="col">סה״כ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((child) => (
            <tr key={child.childId}>
              <th scope="row">{child.childName}</th>
              {child.completionsByDay.map((count, index) => (
                <td key={DAY_LABELS[index]} className={`${level(count)}${index === today ? ' today' : ''}`}>
                  {count || '·'}
                </td>
              ))}
              <td className="total">{child.completionsByDay.reduce((a, b) => a + b, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
