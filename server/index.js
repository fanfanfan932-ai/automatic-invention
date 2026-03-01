import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data', 'records.json');
const mockPath = path.join(__dirname, 'data', 'mockData.json');

app.use(cors());
app.use(express.json());

const readRecords = async () => {
  try {
    const content = await readFile(dataPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    const initial = { registrations: [], trials: [] };
    await writeFile(dataPath, JSON.stringify(initial, null, 2));
    return initial;
  }
};

const writeRecords = async (records) => {
  await writeFile(dataPath, JSON.stringify(records, null, 2));
};

app.get('/health', (_, res) => res.json({ ok: true }));

app.get('/api/content', async (_, res) => {
  const content = JSON.parse(await readFile(mockPath, 'utf-8'));
  res.json(content);
});

app.get('/api/dashboard', async (_, res) => {
  const records = await readRecords();
  res.json({
    registrations: records.registrations,
    trials: records.trials,
    stats: {
      registrationCount: records.registrations.length,
      trialCount: records.trials.length
    }
  });
});

app.post('/api/registrations', async (req, res) => {
  const records = await readRecords();
  const payload = {
    id: `r_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  records.registrations.unshift(payload);
  await writeRecords(records);
  res.status(201).json({ message: '报名成功，欢迎加入蓝色畅想合唱团！', data: payload });
});

app.post('/api/trials', async (req, res) => {
  const records = await readRecords();
  const payload = {
    id: `t_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  records.trials.unshift(payload);
  await writeRecords(records);
  res.status(201).json({ message: '试听预约成功，我们会尽快联系您！', data: payload });
});

app.listen(PORT, () => {
  console.log(`Blue Choir server is running on http://localhost:${PORT}`);
});
