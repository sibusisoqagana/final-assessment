// main screen for reports

import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import ReportCard from '../components/ReportCard'

export default function ReportsScreen() {
  const [reports, setReports] = useState([
    { id: '1', category: 'Pothole', locationText: 'Main Road, Soweto', description: 'Huge pothole causing traffic.', resolved: false },
    { id: '2', category: 'Streetlight', locationText: '5th Street, Sandton', description: 'Light has been out for a week.', resolved: false },
    { id: '3', category: 'Water Leak', locationText: 'Church St, Pretoria', description: 'Water pouring out of the pipe.', resolved: true }
  ])

  function toggleResolved(id) {
    // FIX: immutably map through the list
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id 
          ? { ...report, resolved: !report.resolved } 
          : report
      )
    )
  }

  // derive count from state
  const openCount = reports.filter(r => !r.resolved).length

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MuniFix SA</Text>
      
      <View style={styles.counterBox}>
        <Text style={styles.counterText}>Open Reports: {openCount}</Text>
      </View>

      <FlatList
        data={reports}
        keyExtractor={item => item.id} // FIX: using stable id
        renderItem={({ item }) => (
          <ReportCard 
            report={item} 
            onToggle={() => toggleResolved(item.id)} // FIX: defer call
          />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: 50, paddingHorizontal: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 16 },
  counterBox: { backgroundColor: '#ffcc80', padding: 16, borderRadius: 10, marginBottom: 16, alignItems: 'center' },
  counterText: { fontSize: 18, fontWeight: 'bold', color: '#e65100' }
})