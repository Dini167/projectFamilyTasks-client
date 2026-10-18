import client from './client';

export const getChildren = (page, pageSize) =>
  client.get('/api/children', { params: { page, pageSize } }).then((response) => response.data);

export const approveChild = (id) => client.put(`/api/children/${id}/approval`);

export const resetChildPassword = (id, newPassword) => client.put(`/api/children/${id}/password`, { newPassword });

export const deleteChild = (id) => client.delete(`/api/children/${id}`);
