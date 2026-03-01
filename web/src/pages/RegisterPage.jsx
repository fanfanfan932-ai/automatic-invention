import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SuccessAlert from '../components/SuccessAlert';
import { api } from '../lib/api';

const schema = z.object({
  childName: z.string().min(2, '请输入孩子姓名'),
  age: z.coerce.number().min(4, '年龄需大于等于4').max(16, '年龄需小于等于16'),
  voicePart: z.string().min(1, '请选择声部'),
  parentPhone: z.string().regex(/^1\d{10}$/, '请输入正确的手机号')
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    const result = await api.createRegistration(values);
    alert(result.message);
    reset();
  };

  return (
    <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-brand-700">线上报名</h2>
      <SuccessAlert message="填写信息后提交，即可收到报名成功提示。" />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="孩子姓名" error={errors.childName?.message}>
          <input className="input" {...register('childName')} />
        </Field>
        <Field label="年龄" error={errors.age?.message}>
          <input type="number" className="input" {...register('age')} />
        </Field>
        <Field label="声部" error={errors.voicePart?.message}>
          <select className="input" {...register('voicePart')}>
            <option value="">请选择</option>
            <option>童声高声部</option>
            <option>童声中声部</option>
            <option>童声低声部</option>
          </select>
        </Field>
        <Field label="家长手机号" error={errors.parentPhone?.message}>
          <input className="input" {...register('parentPhone')} />
        </Field>
        <button disabled={isSubmitting} className="w-full rounded-xl bg-brand-600 py-2 text-white">
          {isSubmitting ? '提交中...' : '提交报名'}
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
