import { useState } from 'react';
import { getErrorMessages } from '../api/errors';

export default function useSubmit(action) {
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setErrors([]);
    try {
      await action();
    } catch (error) {
      setErrors(getErrorMessages(error));
    } finally {
      setBusy(false);
    }
  };

  return { busy, errors, submit };
}
