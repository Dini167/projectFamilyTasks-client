import { useCallback } from 'react';
import { getAssignments } from '../api/assignmentsApi';
import usePagedList from './usePagedList';

export default function useAssignments(scope, pageSize = 6) {
  const fetchPage = useCallback((page, size) => getAssignments(scope, page, size), [scope]);
  return usePagedList(fetchPage, pageSize);
}
