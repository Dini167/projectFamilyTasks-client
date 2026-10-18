import { useState } from 'react';
import { getChildren } from '../api/childrenApi';
import ChildCard from '../components/ChildCard';
import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import usePagedList from '../hooks/usePagedList';

const PAGE_SIZE = 8;

export default function ChildrenPage() {
  const { items, totalCount, page, setPage, pageCount, loading, errors, reload } = usePagedList(getChildren, PAGE_SIZE);
  const [notice, setNotice] = useState('');
  const pending = items.filter((child) => !child.isApproved).length;

  const changed = () => {
    setNotice('');
    if (items.length === 1 && page > 1) setPage(page - 1);
    reload();
  };

  return (
    <section>
      <h2>הילדים</h2>
      <p className="subtitle">
        {totalCount} ילדים רשומים.
        {pending > 0 && ` ${pending} בעמוד הזה ממתינים לאישור.`}
      </p>
      {notice && <p className="notice">{notice}</p>}
      <FormErrors errors={errors} />
      {loading && <p className="empty">טוען...</p>}
      {!loading && !errors.length && totalCount === 0 && (
        <p className="empty">עדיין לא נרשמו ילדים. ילד נרשם בעצמו ממסך ההרשמה, ואז כאן מאשרים אותו.</p>
      )}
      <ul className="tasks">
        {items.map((child) => (
          <ChildCard key={child.id} child={child} onChanged={changed} onNotice={setNotice} />
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
