import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../lib/themeContext';
import { useAuth } from '../lib/authContext';
import { Card } from '../components/ui';

export default function AuthScreen() {
  const { theme } = useTheme();
  const auth = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleSheetOpen, setGoogleSheetOpen] = useState(false);

  async function submit() {
    setError(null);
    setBusy(true);
    try {
      if (mode === 'signin') {
        await auth.signInEmail(email, password);
      } else {
        await auth.signUpEmail(email, password, name);
      }
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setError(null);
    setBusy(true);
    try {
      await auth.signInWithGoogle();
    } catch (e: any) {
      setBusy(false);
      // Production OAuth isn't configured — open the inline sheet so the user can still
      // create a Google-tagged account and experience the full flow.
      setGoogleSheetOpen(true);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 22, paddingBottom: 40 }}>
          <View style={{ alignItems: 'center', marginTop: 14, marginBottom: 22 }}>
            <LinearGradient colors={['#E8CE7A', '#D4AF37', '#8F6E1F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 68, height: 68, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Ionicons name="body" size={36} color="#0B0A07" />
            </LinearGradient>
            <Text style={{ color: theme.text, fontSize: 24, fontWeight: '900', letterSpacing: 2.4 }}>ZION ANATOMY</Text>
            <Text style={{ color: theme.textDim, fontSize: 12, letterSpacing: 1, marginTop: 4 }}>HUMAN BODY INTELLIGENCE</Text>
          </View>

          <Card style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', marginBottom: 14 }}>
              {([
                ['signin', 'Sign in'],
                ['signup', 'Create account'],
              ] as const).map(([k, label]) => (
                <TouchableOpacity
                  key={k}
                  onPress={() => {
                    setMode(k);
                    setError(null);
                  }}
                  style={{ flex: 1, paddingVertical: 11, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: mode === k ? theme.accent : 'transparent' }}
                >
                  <Text style={{ color: mode === k ? theme.accent : theme.textDim, fontSize: 13, fontWeight: '800', letterSpacing: 0.5 }}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {mode === 'signup' ? (
              <Field label="Your name" icon="person-outline" value={name} onChange={setName} placeholder="Ada Lovelace" theme={theme} autoCapitalize="words" />
            ) : null}
            <Field label="Email address" icon="mail-outline" value={email} onChange={setEmail} placeholder="you@example.com" theme={theme} autoCapitalize="none" keyboardType="email-address" />
            <Field
              label="Password"
              icon="lock-closed-outline"
              value={password}
              onChange={setPassword}
              placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
              theme={theme}
              secureTextEntry={!showPassword}
              right={
                <TouchableOpacity onPress={() => setShowPassword((s) => !s)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={16} color={theme.textFaint} />
                </TouchableOpacity>
              }
            />

            {error ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 8, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: theme.bad, backgroundColor: theme.dark ? 'rgba(224,122,122,0.10)' : 'rgba(184,74,74,0.06)' }}>
                <Ionicons name="alert-circle" size={15} color={theme.bad} style={{ marginRight: 6, marginTop: 1 }} />
                <Text style={{ color: theme.bad, fontSize: 12.5, lineHeight: 18, flex: 1 }}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              disabled={busy}
              onPress={submit}
              style={{ marginTop: 14, borderRadius: 16, paddingVertical: 14, alignItems: 'center', backgroundColor: busy ? theme.bgCardAlt : theme.accent }}
            >
              <Text style={{ color: busy ? theme.textFaint : (theme.dark ? '#0B0A07' : '#FFFFFF'), fontWeight: '900', letterSpacing: 0.6 }}>
                {busy ? 'WORKING…' : mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 14 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: theme.border }} />
              <Text style={{ color: theme.textFaint, fontSize: 10.5, letterSpacing: 0.8, marginHorizontal: 10 }}>OR CONTINUE WITH</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: theme.border }} />
            </View>

            <TouchableOpacity
              disabled={busy}
              onPress={google}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.bgCardAlt }}
            >
              <GoogleMark />
              <Text style={{ color: theme.text, fontWeight: '800', fontSize: 13.5, marginLeft: 10 }}>Continue with Google</Text>
            </TouchableOpacity>

            <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 16, textAlign: 'center', lineHeight: 17 }}>
              By continuing you agree to the educational-use terms. This app is informational and does not provide medical advice, diagnosis, or treatment.
            </Text>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <GoogleInlineSheet
        visible={googleSheetOpen}
        onClose={() => setGoogleSheetOpen(false)}
        onSubmit={async (n, e) => {
          setBusy(true);
          try {
            await auth.createGoogleAccountInline(n, e, null);
            setGoogleSheetOpen(false);
          } catch (err: any) {
            setError(err?.message ?? 'Could not create Google account.');
          } finally {
            setBusy(false);
          }
        }}
        error={error}
      />
    </SafeAreaView>
  );
}

function GoogleInlineSheet({ visible, onClose, onSubmit, error }: { visible: boolean; onClose: () => void; onSubmit: (name: string, email: string) => void; error: string | null }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' }}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={{ flex: 1 }} />
        <View style={{ backgroundColor: theme.bgElev, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderColor: theme.border, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, padding: 22, paddingBottom: 30 }}>
          <View style={{ width: 42, height: 4, borderRadius: 2, backgroundColor: theme.border, alignSelf: 'center', marginBottom: 16 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              <Ionicons name="logo-google" size={16} color={theme.accent} />
            </View>
            <Text style={{ color: theme.text, fontSize: 17, fontWeight: '900' }}>Continue with Google</Text>
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19, marginBottom: 14 }}>
            Enter the name and Gmail address associated with your Google account. We'll create a Google-tagged ZION ANATOMY profile for you.
          </Text>
          <Field label="Display name" icon="person-outline" value={name} onChange={setName} placeholder="Your name" theme={theme} autoCapitalize="words" />
          <Field label="Gmail address" icon="mail-outline" value={email} onChange={setEmail} placeholder="you@gmail.com" theme={theme} autoCapitalize="none" keyboardType="email-address" />

          {error ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 8, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: theme.bad }}>
              <Ionicons name="alert-circle" size={15} color={theme.bad} style={{ marginRight: 6, marginTop: 1 }} />
              <Text style={{ color: theme.bad, fontSize: 12.5, lineHeight: 18, flex: 1 }}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            disabled={busy || !name.trim() || !email.trim()}
            onPress={async () => {
              setBusy(true);
              try {
                await onSubmit(name, email);
              } finally {
                setBusy(false);
              }
            }}
            style={{ marginTop: 14, borderRadius: 16, paddingVertical: 14, alignItems: 'center', backgroundColor: theme.accent, opacity: busy || !name.trim() || !email.trim() ? 0.6 : 1 }}
          >
            <Text style={{ color: theme.dark ? '#0B0A07' : '#FFFFFF', fontWeight: '900', letterSpacing: 0.6 }}>{busy ? 'WORKING…' : 'CONTINUE'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10, paddingVertical: 12, borderRadius: 16, borderWidth: 1, borderColor: theme.border, alignItems: 'center' }}>
            <Text style={{ color: theme.textDim, fontWeight: '700', fontSize: 13 }}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Field({ label, icon, value, onChange, placeholder, theme, autoCapitalize, keyboardType, secureTextEntry, right }: any) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: theme.textFaint, fontSize: 10.5, letterSpacing: 0.6, marginBottom: 6 }}>{label.toUpperCase()}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.bgCardAlt, paddingHorizontal: 12 }}>
        <Ionicons name={icon} size={16} color={theme.textFaint} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={theme.textFaint}
          style={{ flex: 1, color: theme.text, fontSize: 14.5, paddingVertical: 12, paddingHorizontal: 8 }}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
        />
        {right}
      </View>
    </View>
  );
}

function GoogleMark() {
  return (
    <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#4285F4', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '900' }}>G</Text>
    </View>
  );
}
