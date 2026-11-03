// home screen with real-time bookings

import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../../firebase/config'
import { useApp } from '../context/AppContext'
import BookingCard from '../components/BookingCard'

export default function HomeScreen({ navigation }) {
  const { user, setBookingCount } = useApp()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    let unsubscribe = null

    try {
      const q = query(collection(db, 'users', user.uid, 'bookings'), orderBy('createdAt', 'desc'))
      unsubscribe = onSnapshot(
        q,
        snapshot => {
          const list = []
          snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }))
          setBookings(list)
          setBookingCount(list.length)  // update context count
          setLoading(false)
          setError('')
        },
        err => {
          console.log('listener error', err)
          setError('Could not load bookings.')
          setLoading(false)
        }
      )
    } catch (err) {
      setError('Failed to set up listener.')
      setLoading(false)
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [user])

  async function handleLogout() {
    await signOut(auth)
  }

  async function handleCancel(bookingId) {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'bookings', bookingId))
    } catch (err) {
      alert('Could not cancel booking')
    }
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#1565c0" /><Text>Loading...</Text></View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.count}>Bookings: {bookings.length}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddBooking')}>
        <Text style={styles.addText}>+ New Booking</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookingCard booking={item} onCancel={() => handleCancel(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings yet. Tap + New Booking to start.</Text>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50, paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  email: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  count: { fontSize: 13, color: '#1565c0', marginTop: 2 },
  logoutBtn: { backgroundColor: '#c62828', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  addBtn: { backgroundColor: '#1565c0', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  addText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  errorText: { color: '#c62828', marginBottom: 12 },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#888' }
})