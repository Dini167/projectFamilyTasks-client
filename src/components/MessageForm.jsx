import { useState } from 'react';
import { sendMessage } from '../api/chatApi';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';

const MAX_LENGTH = 500;

export default function MessageForm({ onSent }) {
  const [content, setContent] = useState('');

  const { busy, errors, submit } = useSubmit(async () => {
    await sendMessage(content.trim());
    setContent('');
    onSent();
  });

  return (
    <form className="message-form" onSubmit={submit}>
      <textarea
        value={content}
        maxLength={MAX_LENGTH}
        rows={2}
        placeholder="הודעה לכל המשפחה"
        onChange={(e) => setContent(e.target.value)}
      />
      <FormErrors errors={errors} />
      <button type="submit" className="button" disabled={busy || !content.trim()}>
        {busy ? 'שולח...' : 'שליחה'}
      </button>
    </form>
  );
}
