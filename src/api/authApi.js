import client from './client';

const post = (url, body) => client.post(url, body).then((response) => response.data);

export const login = (body) => post('/api/auth/login', body);

export const registerChild = (body) => post('/api/auth/register', body);

export const registerParent = (body) => post('/api/auth/register-parent', body);
