//  menu

import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import Q1App from './Q1/Q1App'
import Q2App from './Q2/Q2App'
import Q3App from './Q3/Q3App'
import Q4App from './Q4/Q4App'

export default function App() {
  const [screen, setScreen] = useState('menu')

  if (screen === 'q1') return <Q1App />
  if (screen === 'q2') return <Q2App />
  if (screen === 'q3') return <Q3App />
  if (screen === 'q4') return <Q4App />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>DSW02B1 Final</Text>
      <Text style={styles.sub}>Student 223011367</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen('q1')}>
        <Text style={styles.btnText}>Question 1: Commuter Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen('q2')}>
        <Text style={styles.btnText}>Question 2: Mzansi Basket Watch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen('q3')}>
        <Text style={styles.btnText}>Question 3: Clinic Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen('q4')}>
        <Text style={styles.btnText}>Question 4: MuniFix SA</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f5f5f5', paddingTop: 80, paddingHorizontal: 24 },
  heading: { fontSize: 28, fontWeight: 'bold', color: '#1a1a2e', textAlign: 'center' },
  sub: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#1565c0', padding: 18, borderRadius: 10, marginBottom: 14 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }
})