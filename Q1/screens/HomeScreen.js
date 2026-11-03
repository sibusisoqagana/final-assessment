// home screen showing routes with filters

import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import routesData from '../../data/routes'
import RouteCard from '../components/RouteCard'

export default function HomeScreen({ navigation }) {
  const [modeFilter, setModeFilter] = useState('All')
  const [maxFare, setMaxFare] = useState('')
  const [inputText, setInputText] = useState('')

  // helper to classify modes into the 3 filter buttons
  function getModeCategory(mode) {
    if (mode === 'Minibus Taxi') return 'Taxi'
    if (mode === 'Rea Vaya' || mode === 'Metrobus') return 'Bus/BRT'
    if (mode === 'Gautrain') return 'Rail'
    return 'Other'
  }

  // filter logic applies both mode and fare without mutating original
  const filteredRoutes = routesData.filter(route => {
    // 1. check mode
    const matchesMode = modeFilter === 'All' || getModeCategory(route.mode) === modeFilter
    
    // 2. check max fare (if user typed something valid)
    let matchesFare = true
    if (maxFare !== '') {
      const fareNum = parseFloat(maxFare)
      if (!isNaN(fareNum)) {
        matchesFare = route.fare <= fareNum
      }
    }

    return matchesMode && matchesFare
  })

  function handleFareChange(text) {
    setInputText(text)
    setMaxFare(text)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Commuter Dashboard</Text>

      {/* Filter buttons */}
      <View style={styles.filterRow}>
        {['All', 'Taxi', 'Bus/BRT', 'Rail'].map(mode => (
          <TouchableOpacity 
            key={mode} 
            style={[styles.filterBtn, modeFilter === mode && styles.filterBtnActive]}
            onPress={() => setModeFilter(mode)}
          >
            <Text style={[styles.filterText, modeFilter === mode && styles.filterTextActive]}>
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Max fare input */}
      <View style={styles.fareContainer}>
        <Text style={styles.fareLabel}>Max Fare (R):</Text>
        <TextInput
          style={styles.fareInput}
          keyboardType="numeric"
          placeholder="e.g. 30"
          value={inputText}
          onChangeText={handleFareChange}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredRoutes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RouteCard 
            route={item} 
            onPress={() => navigation.navigate('RouteDetails', { route: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No routes found for these filters.</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: 50, paddingHorizontal: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 16 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  filterBtn: { flex: 1, paddingVertical: 8, marginHorizontal: 4, borderRadius: 8, backgroundColor: 'white', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  filterBtnActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  filterText: { fontSize: 13, fontWeight: 'bold', color: '#555' },
  filterTextActive: { color: 'white' },
  fareContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  fareLabel: { fontSize: 14, fontWeight: 'bold', color: '#333', marginRight: 8 },
  fareInput: { flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888' }
})