import client from './client';

export const getSwaps = (page, pageSize) =>
  client.get('/api/swap-requests', { params: { page, pageSize } }).then((response) => response.data);

export const createSwap = (requesterAssignmentId, targetAssignmentId) =>
  client.post('/api/swap-requests', { requesterAssignmentId, targetAssignmentId }).then((response) => response.data);

export const decideSwap = (id, approve) => client.patch(`/api/swap-requests/${id}`, { approve });
