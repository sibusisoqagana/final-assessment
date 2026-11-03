// reusable card for a single transport route

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function RouteCard({ route, onPress }) {
  // check if the route is delayed so i can style it differently
  const isDelayed = route.status === 'Delayed'

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.mode}>{route.mode}</Text>
        <View style={[styles.badge, isDelayed ? styles.badgeDelayed : styles.badgeOperating]}>
          <Text style={styles.badgeText}>{route.status}</Text>
        </View>
      </View>
      
      <Text style={styles.location}>
        {route.from} → {route.to}
      </Text>
      
      <Text style={styles.fare}>R{route.fare.toFixed(2)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  mode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  badgeOperating: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32'
  },
  badgeDelayed: {
    backgroundColor: '#ffebee',
    color: '#c62828'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  fare: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565c0'
  }
})