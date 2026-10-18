export default function Pager({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav className="pager" aria-label="מעבר בין עמודים">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        הקודם
      </button>
      <span>
        עמוד {page} מתוך {pageCount}
      </span>
      <button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>
        הבא
      </button>
    </nav>
  );
}
