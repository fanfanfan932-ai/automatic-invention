import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Card from '../src/components/Card';
import { api } from '../src/lib/api';

export default function ShowcaseScreen() {
  const [content, setContent] = useState({ teachers: [], awards: [], gallery: [] });

  useEffect(() => {
    api.fetchContent().then(setContent);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1d4ed8', marginBottom: 8 }}>师资介绍</Text>
        {content.teachers.map((teacher) => (
          <View key={teacher.id} style={{ backgroundColor: '#eff6ff', borderRadius: 12, padding: 10, marginBottom: 8 }}>
            <Text style={{ fontWeight: '600' }}>{teacher.name}</Text>
            <Text style={{ color: '#1d4ed8' }}>{teacher.role}</Text>
            <Text>{teacher.bio}</Text>
          </View>
        ))}
      </Card>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1d4ed8', marginBottom: 8 }}>演出图片</Text>
        {content.gallery.map((url) => (
          <Image key={url} source={{ uri: url }} style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 8 }} />
        ))}
      </Card>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1d4ed8', marginBottom: 8 }}>获奖展示</Text>
        {content.awards.map((award) => (
          <Text key={award} style={{ marginBottom: 6 }}>• {award}</Text>
        ))}
      </Card>
    </ScrollView>
  );
}
