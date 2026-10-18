import { useState } from 'react';
import { assignTaskToChild } from '../api/childrenApi';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import SelectField from './SelectField';

export default function AssignTaskForm({ child, freeTasks, onAssigned, onCancel }) {
  const [assignmentId, setAssignmentId] = useState(freeTasks[0].id);
  const options = freeTasks.map((task) => ({ value: task.id, label: task.description }));

  const { busy, errors, submit } = useSubmit(async () => {
    await assignTaskToChild(child.childId, assignmentId);
    onAssigned();
  });

  return (
    <form className="inline-form" onSubmit={submit}>
      <SelectField
        label={`משימה לשיבוץ ל${child.childName}`}
        options={options}
        value={assignmentId}
        onChange={(e) => setAssignmentId(Number(e.target.value))}
      />
      <FormErrors errors={errors} prominent />
      <div className="row">
        <button type="submit" className="button" disabled={busy}>
          {busy ? 'משבץ...' : 'שיבוץ'}
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          ביטול
        </button>
      </div>
    </form>
  );
}
