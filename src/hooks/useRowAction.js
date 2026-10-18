import { useState } from 'react';
import { getErrorMessages, isConflict } from '../api/errors';

export default function useRowAction(action, { onSuccess, onSettled } = {}) {
  const [busyId, setBusyId] = useState(null);
  const [errors, setErrors] = useState([]);
  const [conflict, setConflict] = useState(false);

  const run = async (id) => {
    setBusyId(id);
    setErrors([]);
    try {
      onSuccess?.(await action(id));
    } catch (error) {
      setErrors(getErrorMessages(error));
      setConflict(isConflict(error));
    } finally {
      setBusyId(null);
      onSettled?.();
    }
  };

  return { busyId, errors, conflict, run };
}
