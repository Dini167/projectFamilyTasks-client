export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(({ key, label }) => (
        <button key={key} type="button" role="tab" aria-selected={active === key} onClick={() => onChange(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}
