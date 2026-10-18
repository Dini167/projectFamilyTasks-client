import client from './client';

const data = (response) => response.data;

export const takeAssignment = (id) => client.put(`/api/assignments/${id}/assignee`);

export const completeAssignment = (id) => client.post(`/api/assignments/${id}/completions`).then(data);

export const getAssignments = (scope, page, pageSize) =>
  client.get('/api/assignments', { params: { scope, page, pageSize } }).then(data);

export const getMyProfile = () => client.get('/api/children/me').then(data);
