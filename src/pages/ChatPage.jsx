import { useEffect } from 'react';
import { getMessages } from '../api/chatApi';
import { getSession } from '../api/tokenStorage';
import FormErrors from '../components/FormErrors';
import MessageForm from '../components/MessageForm';
import Pager from '../components/Pager';
import usePagedList from '../hooks/usePagedList';

const PAGE_SIZE = 15;
const REFRESH_MS = 10000;

const formatTime = (value) => new Date(value).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });

export default function ChatPage() {
  const { items, page, setPage, pageCount, loading, errors, reload } = usePagedList(getMessages, PAGE_SIZE);
  const me = getSession()?.name;

  useEffect(() => {
    const timer = setInterval(reload, REFRESH_MS);
    return () => clearInterval(timer);
  }, [reload]);

  const sent = () => {
    setPage(1);
    reload();
  };

  return (
    <section>
      <h2>צ'אט משפחתי</h2>
      <p className="subtitle">ההודעות נראות לכל בני המשפחה. הצ'אט מתרענן מדי כמה שניות.</p>
      <MessageForm onSent={sent} />
      <FormErrors errors={errors} />
      {loading && <p className="empty">טוען הודעות...</p>}
      {!loading && !errors.length && items.length === 0 && <p className="empty">עדיין אין הודעות.</p>}
      <ul className="messages">
        {items.map((message) => (
          <li key={message.id} className={message.senderName === me ? 'message mine' : 'message'}>
            <div className="message-head">
              <strong>{message.senderName}</strong>
              <span>{formatTime(message.sentAt)}</span>
            </div>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
