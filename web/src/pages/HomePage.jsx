import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-brand-700">让孩子在歌声中自信成长</h1>
        <p className="mb-5 leading-7 text-slate-600">
          蓝色畅想合唱团专注 6-14 岁儿童音乐启蒙与舞台训练，提供分龄教学、专业排练与公开演出机会。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/register" className="rounded-xl bg-brand-600 px-5 py-2 text-white">
            立即报名
          </Link>
          <Link to="/trial" className="rounded-xl bg-blue-100 px-5 py-2 text-brand-700">
            预约试听课
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
        <img
          src="https://placehold.co/720x420/2563eb/ffffff?text=Blue+Dream+Choir"
          alt="合唱团演出"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
