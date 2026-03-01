const API_BASE = 'http://localhost:3001/api';

export const api = {
  fetchContent: async () => {
    const res = await fetch(`${API_BASE}/content`);
    return res.json();
  },
  createRegistration: async (payload) => {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },
  createTrial: async (payload) => {
    const res = await fetch(`${API_BASE}/trials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};
