import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../lib/api';

const schema = z.object({
  childName: z.string().min(2, '请输入孩子姓名'),
  date: z.string().min(1, '请选择日期'),
  timeSlot: z.string().min(1, '请选择时间段'),
  parentPhone: z.string().regex(/^1\d{10}$/, '请输入正确的手机号')
});

export default function TrialPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    const result = await api.createTrial(values);
    alert(`${result.message}\n预约时间：${values.date} ${values.timeSlot}`);
    reset();
  };

  return (
    <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-brand-700">试听预约</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="孩子姓名" error={errors.childName?.message}>
          <input className="input" {...register('childName')} />
        </Field>
        <Field label="试听日期" error={errors.date?.message}>
          <input type="date" className="input" {...register('date')} />
        </Field>
        <Field label="时间段" error={errors.timeSlot?.message}>
          <select className="input" {...register('timeSlot')}>
            <option value="">请选择</option>
            <option>10:00-11:00</option>
            <option>15:00-16:00</option>
            <option>18:00-19:00</option>
          </select>
        </Field>
        <Field label="家长手机号" error={errors.parentPhone?.message}>
          <input className="input" {...register('parentPhone')} />
        </Field>
        <button disabled={isSubmitting} className="w-full rounded-xl bg-brand-600 py-2 text-white">
          {isSubmitting ? '提交中...' : '提交预约'}
        </button>
      </form>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-slate-600">{label}</span>
      {children}
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </label>
  );
}
