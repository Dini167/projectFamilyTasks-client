import { useEffect, useState } from 'react';
import { getErrorMessages } from '../api/errors';

export default function usePagedList(fetchPage, pageSize) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetchPage(page, pageSize)
      .then((result) => {
        if (ignore) return;
        setData(result);
        setErrors([]);
      })
      .catch((error) => !ignore && setErrors(getErrorMessages(error)))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [fetchPage, page, pageSize, reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);
  const pageCount = Math.max(1, Math.ceil(data.totalCount / pageSize));

  return { ...data, page, setPage, pageCount, loading, errors, reload };
}
