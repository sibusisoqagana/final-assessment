// form to create a booking

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useApp } from '../context/AppContext'

export default function AddBookingScreen({ navigation }) {
  const { user } = useApp()
  const [serviceType, setServiceType] = useState('General Consultation')
  const [preferredDate, setPreferredDate] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit() {
    if (preferredDate.trim() === '') {
      Alert.alert('Error', 'Please enter a preferred date')
      return
    }

    setSaving(true)
    try {
      await addDoc(collection(db, 'users', user.uid, 'bookings'), {
        serviceType,
        preferredDate,
        notes,
        status: 'Pending',
        createdAt: serverTimestamp()
      })
      navigation.goBack()
    } catch (err) {
      Alert.alert('Error', 'Could not create booking')
    }
    setSaving(false)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>New Booking</Text>

      <Text style={styles.label}>Service Type</Text>
      {['General Consultation', 'Chronic Medicine Collection', 'Immunisation Enquiry'].map(type => (
        <TouchableOpacity
          key={type}
          style={[styles.optionBtn, serviceType === type && styles.optionBtnActive]}
          onPress={() => setServiceType(type)}
        >
          <Text style={[styles.optionText, serviceType === type && styles.optionTextActive]}>{type}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Preferred Date</Text>
      <TextInput
        style={styles.input}
        value={preferredDate}
        onChangeText={setPreferredDate}
        placeholder="e.g. 2026-11-15"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Anything the clinic should know..."
      />

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={handleSubmit} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Saving...' : 'Create Booking'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, paddingTop: 50 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 6 },
  optionBtn: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#ddd' },
  optionBtnActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  optionText: { color: '#333', fontWeight: '600' },
  optionTextActive: { color: 'white' },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  textArea: { height: 80, textAlignVertical: 'top' },
  btn: { backgroundColor: '#1565c0', padding: 16, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
})