import client from './client';

export const getAssignments = (scope, page, pageSize) =>
  client.get('/api/assignments', { params: { scope, page, pageSize } }).then((response) => response.data);
