import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function AdminPage() {
  const [dashboard, setDashboard] = useState({
    registrations: [],
    trials: [],
    stats: { registrationCount: 0, trialCount: 0 }
  });

  useEffect(() => {
    api.fetchDashboard().then(setDashboard);
  }, []);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard label="报名人数" value={dashboard.stats.registrationCount} />
        <StatCard label="预约人数" value={dashboard.stats.trialCount} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ListCard title="报名列表" rows={dashboard.registrations} type="registration" />
        <ListCard title="预约列表" rows={dashboard.trials} type="trial" />
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-brand-700">{value}</p>
    </article>
  );
}

function ListCard({ title, rows, type }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-brand-700">{title}</h3>
      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-slate-500">暂无数据</p>}
        {rows.map((row) => (
          <div key={row.id} className="rounded-lg bg-blue-50 p-3 text-sm">
            <p>姓名：{row.childName}</p>
            <p>手机号：{row.parentPhone}</p>
            {type === 'registration' ? <p>声部：{row.voicePart}</p> : <p>时间：{row.date} {row.timeSlot}</p>}
          </div>
        ))}
      </div>
    </article>
  );
}
