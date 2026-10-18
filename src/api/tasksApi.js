import client from './client';

const data = (response) => response.data;

export const getTasks = (page, pageSize) =>
  client.get('/api/house-tasks', { params: { page, pageSize } }).then(data);

export const getCategories = () => client.get('/api/categories').then(data);

export const createTask = (task) => client.post('/api/house-tasks', task).then(data);

export const updateTask = (id, task) => client.put(`/api/house-tasks/${id}`, task);

export const deleteTask = (id) => client.delete(`/api/house-tasks/${id}`);
