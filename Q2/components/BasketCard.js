// card for one grocery item

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function BasketCard({ item, isWatchlisted, onToggleWatchlist }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.category}>{item.category}</Text>
      
      <View style={styles.locationRow}>
        <Text style={styles.store}>{item.store}</Text>
        <Text style={styles.location}>{item.area}, {item.province}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.btn, isWatchlisted && styles.btnActive]} 
        onPress={onToggleWatchlist}
      >
        <Text style={styles.btnText}>
          {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#2e7d32' },
  category: { fontSize: 13, color: '#666', fontStyle: 'italic', marginBottom: 8 },
  locationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  store: { fontSize: 13, fontWeight: 'bold', color: '#1565c0' },
  location: { fontSize: 13, color: '#666' },
  btn: { backgroundColor: '#f4f4f4', padding: 10, borderRadius: 8, alignItems: 'center' },
  btnActive: { backgroundColor: '#ffebee' },
  btnText: { fontSize: 13, fontWeight: 'bold', color: '#333' }
})