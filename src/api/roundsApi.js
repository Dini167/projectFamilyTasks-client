import client from './client';

const data = (response) => response.data;

export const getCurrentRound = () => client.get('/api/rounds/current').then(data);

export const getRoundSummary = (roundId) => client.get(`/api/rounds/${roundId}/summary`).then(data);

export const removeFromRound = (roundId, assignmentId) =>
  client.delete(`/api/rounds/${roundId}/assignments/${assignmentId}`);

export const openRound = (tasksQuotaPerChild) => client.post('/api/rounds', { tasksQuotaPerChild }).then(data);

export const setRoundStatus = (roundId, status) => client.patch(`/api/rounds/${roundId}`, { status });
