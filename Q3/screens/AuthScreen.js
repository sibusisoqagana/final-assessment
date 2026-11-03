// login and register for clinic

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit() {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in both fields')
      return
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }

    setBusy(true)
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      let msg = 'Something went wrong'
      if (err.code === 'auth/email-already-in-use') msg = 'That email is already registered'
      else if (err.code === 'auth/invalid-email') msg = 'That email is not valid'
      else if (err.code === 'auth/weak-password') msg = 'Password must be at least 6 characters'
      else if (err.code === 'auth/user-not-found') msg = 'No account with that email'
      else if (err.code === 'auth/wrong-password') msg = 'Wrong password'
      Alert.alert('Error', msg)
    }
    setBusy(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>UJ Clinic Bookings</Text>
      <Text style={styles.sub}>{isRegister ? 'Create a new account' : 'Sign in to your account'}</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="you@uj.ac.za"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="at least 6 characters"
        secureTextEntry
      />

      <TouchableOpacity style={[styles.btn, busy && styles.btnDisabled]} onPress={handleSubmit} disabled={busy}>
        {busy ? <ActivityIndicator color="white" /> : (
          <Text style={styles.btnText}>{isRegister ? 'Register' : 'Sign In'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.switchText}>
          {isRegister ? 'Already have an account? Sign in' : 'New here? Register'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 80, paddingHorizontal: 24 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', textAlign: 'center' },
  sub: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 24, marginTop: 4 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, fontSize: 15, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: '#1565c0', padding: 14, borderRadius: 8, marginTop: 24, alignItems: 'center', minHeight: 50, justifyContent: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  switchText: { color: '#1565c0', textAlign: 'center', marginTop: 16, fontSize: 14 }
})