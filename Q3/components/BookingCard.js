// one booking card

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function BookingCard({ booking, onCancel }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.service}>{booking.serviceType}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{booking.status}</Text>
        </View>
      </View>
      <Text style={styles.date}>Date: {booking.preferredDate}</Text>
      {booking.notes ? <Text style={styles.notes}>{booking.notes}</Text> : null}

      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#1565c0' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  service: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  badge: { backgroundColor: '#e3f2fd', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#1565c0', fontSize: 12, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#666', marginBottom: 4 },
  notes: { fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 8 },
  cancelBtn: { backgroundColor: '#ffebee', padding: 10, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  cancelText: { color: '#c62828', fontWeight: 'bold', fontSize: 13 }
})