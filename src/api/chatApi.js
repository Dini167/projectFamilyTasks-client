import client from './client';

export const getMessages = (page, pageSize) =>
  client.get('/api/messages', { params: { page, pageSize } }).then((response) => response.data);

export const sendMessage = (content) => client.post('/api/messages', { content }).then((response) => response.data);
