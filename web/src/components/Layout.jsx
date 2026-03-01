import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/register', label: '报名' },
  { to: '/trial', label: '试听预约' },
  { to: '/showcase', label: '展示' },
  { to: '/admin', label: '管理后台' }
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-blue-50 text-slate-700">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-brand-700">
            蓝色畅想合唱团
          </Link>
          <nav className="flex gap-3 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1 ${isActive ? 'bg-brand-600 text-white' : 'bg-blue-100 text-brand-700'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
