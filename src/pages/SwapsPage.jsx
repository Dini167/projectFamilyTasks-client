import { useState } from 'react';
import { SWAP_STATUS } from '../api/labels';
import { decideSwap, getSwaps } from '../api/swapsApi';
import FormErrors from '../components/FormErrors';
import Pager from '../components/Pager';
import SwapCard from '../components/SwapCard';
import SwapRequestForm from '../components/SwapRequestForm';
import usePagedList from '../hooks/usePagedList';
import useRowAction from '../hooks/useRowAction';

const PAGE_SIZE = 8;

export default function SwapsPage({ childId }) {
  const isChild = childId !== undefined;
  const { items, totalCount, page, setPage, pageCount, loading, errors, reload } = usePagedList(getSwaps, PAGE_SIZE);
  const [creating, setCreating] = useState(false);

  const approve = useRowAction((id) => decideSwap(id, true), { onSettled: reload });
  const reject = useRowAction((id) => decideSwap(id, false), { onSettled: reload });
  const busy = approve.busyId !== null || reject.busyId !== null;

  const created = () => {
    setCreating(false);
    setPage(1);
    reload();
  };

  // הילד מחליט בשלב הראשון על בקשה שהופנתה אליו, וההורה בשלב השני.
  const canDecide = (swap) =>
    isChild
      ? swap.status === SWAP_STATUS.pendingSibling && swap.targetAssignment.childId === childId
      : swap.status === SWAP_STATUS.pendingParent;

  const renderActions = (swap) =>
    canDecide(swap) && (
      <div className="confirm">
        <button type="button" className="take-button" disabled={busy} onClick={() => approve.run(swap.id)}>
          אישור
        </button>
        <button type="button" className="link-button" disabled={busy} onClick={() => reject.run(swap.id)}>
          דחייה
        </button>
      </div>
    );

  return (
    <section>
      <div className="heading">
        <h2>בקשות החלפה</h2>
        {isChild && !creating && (
          <button type="button" className="take-button" onClick={() => setCreating(true)}>
            בקשת החלפה
          </button>
        )}
      </div>
      <p className="subtitle">
        {isChild
          ? 'החלפה בין משימה שלך למשימה של אח. האח מאשר ואחריו ההורה.'
          : 'בקשות שהאחים כבר אישרו ממתינות להחלטת ההורה.'}
      </p>
      {creating && <SwapRequestForm onCreated={created} onCancel={() => setCreating(false)} />}
      <FormErrors errors={errors} />
      <FormErrors errors={approve.errors} prominent={approve.conflict} />
      <FormErrors errors={reject.errors} prominent={reject.conflict} />
      {loading && <p className="empty">טוען...</p>}
      {!loading && !errors.length && totalCount === 0 && <p className="empty">אין בקשות החלפה.</p>}
      <ul className="tasks">
        {items.map((swap) => (
          <SwapCard key={swap.id} swap={swap}>
            {renderActions(swap)}
          </SwapCard>
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
