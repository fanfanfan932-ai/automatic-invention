import { Link } from 'expo-router';
import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import Card from '../src/components/Card';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#1d4ed8', marginBottom: 8 }}>蓝色畅想合唱团</Text>
        <Text style={{ color: '#475569', lineHeight: 22, marginBottom: 12 }}>
          面向 6-14 岁儿童的专业合唱训练营，帮助孩子提升音乐素养和舞台自信。
        </Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Link href="/register" asChild>
            <Pressable style={btnPrimary}><Text style={btnText}>招生报名</Text></Pressable>
          </Link>
          <Link href="/trial" asChild>
            <Pressable style={btnGhost}><Text style={{ color: '#1d4ed8' }}>试听预约</Text></Pressable>
          </Link>
        </View>
      </Card>
      <Card>
        <Image
          source={{ uri: 'https://placehold.co/720x420/2563eb/ffffff?text=Blue+Dream+Choir+App' }}
          style={{ width: '100%', height: 200, borderRadius: 14 }}
        />
      </Card>
      <Card>
        <Link href="/showcase" asChild>
          <Pressable style={btnPrimary}><Text style={btnText}>查看师资与成果展示</Text></Pressable>
        </Link>
      </Card>
    </ScrollView>
  );
}

const btnPrimary = { backgroundColor: '#2563eb', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16 };
const btnGhost = { backgroundColor: '#dbeafe', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16 };
const btnText = { color: '#fff', fontWeight: '600' };
