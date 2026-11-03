// main app for grocery basket

import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './apiConfig'
import BasketCard from './components/BasketCard'

const CACHE_KEY = '@mzansi/basket_cache'
const WATCHLIST_KEY = '@mzansi/watchlist'

export default function Q2App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fromCache, setFromCache] = useState(false)
  
  // filters
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')

  // watchlist
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    loadData()
    loadWatchlist()
  }, [])

  async function loadData() {
    setLoading(true)
    setError(false)
    setFromCache(false)

    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Network response not ok')
      
      const json = await response.json()
      setData(json)
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(json))
    } catch (err) {
      // api failed, try cache
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY)
        if (cached) {
          setData(JSON.parse(cached))
          setFromCache(true)
        } else {
          setError(true)
        }
      } catch (cacheErr) {
        setError(true)
      }
    }
    setLoading(false)
  }

  async function loadWatchlist() {
    try {
      const saved = await AsyncStorage.getItem(WATCHLIST_KEY)
      if (saved) setWatchlist(JSON.parse(saved))
    } catch (err) {
      console.log('watchlist load failed')
    }
  }

  async function toggleWatchlist(id) {
    let newList
    if (watchlist.includes(id)) {
      newList = watchlist.filter(item => item !== id)
    } else {
      newList = [...watchlist, id]
    }
    setWatchlist(newList)
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList))
  }

  // derive filtered data based on search, category, maxPrice
  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || item.category === category
    const matchesPrice = maxPrice === '' || item.price <= parseFloat(maxPrice)
    return matchesSearch && matchesCategory && matchesPrice
  })

  // calculate average price of visible items
  let totalPrice = 0
  filteredData.forEach(item => totalPrice += item.price)
  const avgPrice = filteredData.length > 0 ? (totalPrice / filteredData.length).toFixed(2) : '0.00'

  // get unique categories
  const categories = ['All', ...new Set(data.map(item => item.category))]

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1565c0" />
        <Text style={styles.loadingText}>Loading basket...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load data. No cache available.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mzansi Basket Watch</Text>
      
      {fromCache && (
        <Text style={styles.cacheWarning}>⚠️ Offline Mode: Showing cached data</Text>
      )}

      {/* Search & Filters */}
      <TextInput 
        style={styles.input} 
        placeholder="Search items..." 
        value={search} 
        onChangeText={setSearch} 
      />
      
      <View style={styles.filterRow}>
        <TextInput 
          style={[styles.input, { flex: 1, marginRight: 8 }]} 
          placeholder="Max Price (R)" 
          keyboardType="numeric" 
          value={maxPrice} 
          onChangeText={setMaxPrice} 
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {categories.map(cat => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.catBtn, category === cat && styles.catBtnActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Text style={styles.statText}>Results: {filteredData.length}</Text>
        <Text style={styles.statText}>Avg Price: R{avgPrice}</Text>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BasketCard 
            item={item} 
            isWatchlisted={watchlist.includes(item.id)} 
            onToggleWatchlist={() => toggleWatchlist(item.id)} 
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items match your search.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: 50, paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 12 },
  cacheWarning: { backgroundColor: '#fff3cd', color: '#856404', padding: 8, borderRadius: 6, marginBottom: 12, textAlign: 'center', fontSize: 12, fontWeight: 'bold' },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  filterRow: { flexDirection: 'row', marginBottom: 12 },
  catScroll: { marginBottom: 12, maxHeight: 40 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', marginRight: 8 },
  catBtnActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  catText: { color: '#333', fontWeight: 'bold', fontSize: 13 },
  catTextActive: { color: 'white' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, backgroundColor: '#e3f2fd', padding: 10, borderRadius: 8 },
  statText: { fontSize: 13, fontWeight: 'bold', color: '#1565c0' },
  loadingText: { marginTop: 10, color: '#555' },
  errorText: { color: '#c62828', marginBottom: 16, fontSize: 16, textAlign: 'center' },
  retryBtn: { backgroundColor: '#1565c0', padding: 12, borderRadius: 8 },
  retryText: { color: 'white', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888' }
})