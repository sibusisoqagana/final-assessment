// repaired report card with stable animation

import React, { useRef, useEffect } from 'react'
import { View, Text, Pressable, Animated, StyleSheet, Easing } from 'react-native'

export default function ReportCard({ report, onToggle }) {
  // useRef so the animation value survives re-renders
  const fade = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(15)).current

  useEffect(() => {
    // run once when the card appears
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ]).start()
  }, []) // empty array prevents unnecessary restarts

  return (
    <Animated.View style={[
      styles.card,
      report.resolved ? styles.cardResolved : styles.cardOpen,
      { opacity: fade, transform: [{ translateY }] }
    ]}>
      <View style={styles.topRow}>
        <Text style={styles.category}>{report.category}</Text>
        <Text style={styles.status}>{report.resolved ? 'Resolved' : 'Open'}</Text>
      </View>
      
      <Text style={styles.location}>{report.locationText}</Text>
      <Text style={styles.description}>{report.description}</Text>

      <Pressable 
        style={[styles.btn, report.resolved && styles.btnResolved]} 
        onPress={onToggle} // FIX: was onToggle(report.id), now only fires on press
      >
        <Text style={styles.btnText}>{report.resolved ? 'Re-open' : 'Mark Resolved'}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12, borderLeftWidth: 5 },
  cardOpen: { borderLeftColor: '#e65100' },
  cardResolved: { borderLeftColor: '#2e7d32', backgroundColor: '#f1f8e9' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  category: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  status: { fontSize: 14, fontWeight: 'bold', color: '#555' },
  location: { fontSize: 14, color: '#1565c0', marginBottom: 4 },
  description: { fontSize: 14, color: '#666', marginBottom: 12 },
  btn: { backgroundColor: '#e65100', padding: 12, borderRadius: 6, alignItems: 'center' },
  btnResolved: { backgroundColor: '#2e7d32' },
  btnText: { color: 'white', fontWeight: 'bold' }
})