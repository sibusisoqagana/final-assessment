// details for a selected route

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function RouteDetailsScreen({ route, navigation }) {
  // get the route passed from HomeScreen
  const { route: selectedRoute } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route Details</Text>
      
      <View style={styles.card}>
        <Text style={styles.mode}>{selectedRoute.mode}</Text>
        <Text style={styles.location}>{selectedRoute.from} to {selectedRoute.to}</Text>
        <Text style={styles.fare}>R{selectedRoute.fare.toFixed(2)}</Text>
        <Text style={styles.status}>Status: {selectedRoute.status}</Text>
      </View>

      <TouchableOpacity 
        style={styles.reportBtn}
        onPress={() => navigation.navigate('ReportIssue', { routeId: selectedRoute.id })}
      >
        <Text style={styles.reportBtnText}>Report a Problem</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20 },
  mode: { fontSize: 20, fontWeight: 'bold', color: '#1565c0', marginBottom: 8 },
  location: { fontSize: 16, color: '#333', marginBottom: 12 },
  fare: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginBottom: 8 },
  status: { fontSize: 14, color: '#666', fontStyle: 'italic' },
  reportBtn: { backgroundColor: '#c62828', padding: 16, borderRadius: 8, alignItems: 'center' },
  reportBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
})