import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function ShowcasePage() {
  const [content, setContent] = useState({ teachers: [], gallery: [], awards: [] });

  useEffect(() => {
    api.fetchContent().then(setContent);
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-2xl font-bold text-brand-700">师资介绍</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {content.teachers.map((teacher) => (
            <article key={teacher.id} className="rounded-xl bg-blue-50 p-4">
              <h3 className="font-semibold">{teacher.name}</h3>
              <p className="text-sm text-brand-700">{teacher.role}</p>
              <p className="mt-2 text-sm">{teacher.bio}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-2xl font-bold text-brand-700">演出风采</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {content.gallery.map((img) => (
            <img key={img} src={img} alt="演出" className="rounded-xl" />
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-2xl font-bold text-brand-700">获奖展示</h2>
        <ul className="list-disc space-y-2 pl-5">
          {content.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
