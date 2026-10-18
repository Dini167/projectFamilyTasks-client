import client from './client';

export const takeAssignment = (id) => client.put(`/api/assignments/${id}/assignee`);

export const getAssignments = (scope, page, pageSize) =>
  client.get('/api/assignments', { params: { scope, page, pageSize } }).then((response) => response.data);
