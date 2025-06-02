import axios from 'axios';

    // Use relative path since Vite proxy will handle forwarding
    const api = axios.create({
      baseURL: '/api', // Proxy will forward /api/chat to http://127.0.0.1:5000/chat
      headers: {
        'Content-Type': 'application/json',
      },
    });

export const sendMessage = async (message, specialty) => {
  const response = await api.post('/chat', { message, specialty });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
