import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { Card } from '../components/ui';
import { COURSES } from '../lib/data/courses';

export default function CertificateScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const courseId = route?.params?.courseId as string;
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>Certificate</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        <View style={{ borderWidth: 2, borderColor: theme.accent, borderRadius: 18, padding: 22, backgroundColor: theme.bgCard }}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="ribbon" size={42} color={theme.accent} />
            <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.6, marginTop: 8 }}>CERTIFICATE OF COMPLETION</Text>
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12.5, textAlign: 'center', marginBottom: 8 }}>This certifies successful completion of</Text>
          <Text style={{ color: theme.text, fontSize: 22, fontWeight: '900', textAlign: 'center', lineHeight: 28, marginBottom: 16 }}>{course.title}</Text>
          <Text style={{ color: theme.textDim, fontSize: 12, textAlign: 'center' }}>All {course.lessons.length} lessons completed</Text>
          <View style={{ marginTop: 18, borderTopWidth: 1, borderColor: theme.border, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 0.8 }}>LEVEL · {course.level.toUpperCase()}</Text>
            <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 0.8 }}>ZION ANATOMY</Text>
          </View>
        </View>
        <Text style={{ color: theme.textFaint, fontSize: 11, textAlign: 'center', marginTop: 14, lineHeight: 17 }}>
          Educational certificate of completion within the ZION ANATOMY app. Not an academic qualification.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}