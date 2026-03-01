import { Text, TextInput, View } from 'react-native';

export default function InputField({ label, error, ...props }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6, color: '#334155' }}>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#bfdbfe',
          borderRadius: 12,
          padding: 10,
          backgroundColor: '#fff'
        }}
        {...props}
      />
      {error ? <Text style={{ color: '#dc2626', marginTop: 4 }}>{error}</Text> : null}
    </View>
  );
}
