const CARDS = [
  { key: 'children', label: 'ילדים בסבב' },
  { key: 'doneThisWeek', label: 'בוצעו השבוע' },
  { key: 'pending', label: 'ממתינות לביצוע' },
  { key: 'free', label: 'משימות פנויות' },
];

export default function OverviewCards({ stats }) {
  return (
    <ul className="overview">
      {CARDS.map(({ key, label }) => (
        <li key={key}>
          <strong>{stats[key]}</strong>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
