import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text } from 'react-native';
import { z } from 'zod';
import Card from '../src/components/Card';
import InputField from '../src/components/InputField';
import { api } from '../src/lib/api';

const schema = z.object({
  childName: z.string().min(2, '请输入孩子姓名'),
  date: z.string().min(1, '请输入日期'),
  timeSlot: z.string().min(1, '请输入时间段'),
  parentPhone: z.string().regex(/^1\d{10}$/, '请输入正确手机号')
});

export default function TrialScreen() {
  const [form, setForm] = useState({ childName: '', date: '', timeSlot: '', parentPhone: '' });
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next = {};
      parsed.error.issues.forEach((it) => (next[it.path[0]] = it.message));
      setErrors(next);
      return;
    }
    setErrors({});
    const res = await api.createTrial(parsed.data);
    Alert.alert('预约成功', `${res.message}\n${parsed.data.date} ${parsed.data.timeSlot}`);
    setForm({ childName: '', date: '', timeSlot: '', parentPhone: '' });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1d4ed8', marginBottom: 8 }}>试听预约</Text>
        <InputField label="孩子姓名" value={form.childName} onChangeText={(v) => setForm({ ...form, childName: v })} error={errors.childName} />
        <InputField label="试听日期（YYYY-MM-DD）" value={form.date} onChangeText={(v) => setForm({ ...form, date: v })} error={errors.date} />
        <InputField label="时间段（如 18:00-19:00）" value={form.timeSlot} onChangeText={(v) => setForm({ ...form, timeSlot: v })} error={errors.timeSlot} />
        <InputField label="家长手机号" keyboardType="number-pad" value={form.parentPhone} onChangeText={(v) => setForm({ ...form, parentPhone: v })} error={errors.parentPhone} />
        <Pressable style={{ backgroundColor: '#2563eb', borderRadius: 12, padding: 12 }} onPress={submit}>
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>提交预约</Text>
        </Pressable>
      </Card>
    </ScrollView>
  );
}
