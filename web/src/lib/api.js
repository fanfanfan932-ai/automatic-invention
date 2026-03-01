const API_BASE = 'http://localhost:3001/api';

export const api = {
  async fetchContent() {
    const res = await fetch(`${API_BASE}/content`);
    return res.json();
  },
  async createRegistration(payload) {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },
  async createTrial(payload) {
    const res = await fetch(`${API_BASE}/trials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },
  async fetchDashboard() {
    const res = await fetch(`${API_BASE}/dashboard`);
    return res.json();
  }
};
