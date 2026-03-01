import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text } from 'react-native';
import { z } from 'zod';
import Card from '../src/components/Card';
import InputField from '../src/components/InputField';
import { api } from '../src/lib/api';

const schema = z.object({
  childName: z.string().min(2, '请输入孩子姓名'),
  age: z.coerce.number().min(4).max(16),
  voicePart: z.string().min(1, '请输入声部'),
  parentPhone: z.string().regex(/^1\d{10}$/, '请输入正确手机号')
});

export default function RegisterScreen() {
  const [form, setForm] = useState({ childName: '', age: '', voicePart: '', parentPhone: '' });
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
    const res = await api.createRegistration(parsed.data);
    Alert.alert('报名结果', res.message);
    setForm({ childName: '', age: '', voicePart: '', parentPhone: '' });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1d4ed8', marginBottom: 8 }}>线上报名</Text>
        <InputField label="孩子姓名" value={form.childName} onChangeText={(v) => setForm({ ...form, childName: v })} error={errors.childName} />
        <InputField label="年龄" keyboardType="number-pad" value={form.age} onChangeText={(v) => setForm({ ...form, age: v })} error={errors.age} />
        <InputField label="声部（如童声高声部）" value={form.voicePart} onChangeText={(v) => setForm({ ...form, voicePart: v })} error={errors.voicePart} />
        <InputField label="家长手机号" keyboardType="number-pad" value={form.parentPhone} onChangeText={(v) => setForm({ ...form, parentPhone: v })} error={errors.parentPhone} />
        <Pressable style={{ backgroundColor: '#2563eb', borderRadius: 12, padding: 12 }} onPress={submit}>
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>提交报名</Text>
        </Pressable>
      </Card>
    </ScrollView>
  );
}
