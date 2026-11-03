// form to report an issue

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

export default function ReportIssueScreen({ route, navigation }) {
  const { routeId } = route.params

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [confirmation, setConfirmation] = useState(null)

  function validate() {
    let newErrors = {}

    if (!name.trim()) newErrors.name = 'Name is required'

    // check exactly 10 digits starting with 0
    const phoneRegex = /^0\d{9}$/
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Must be 10 digits starting with 0'
    }

    if (!category.trim()) newErrors.category = 'Category is required'

    if (description.length < 20) {
      newErrors.description = 'Must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (validate()) {
      // build the report object
      const report = {
        routeId: routeId,
        name: name,
        phone: phone,
        category: category,
        description: description,
        submittedAt: new Date().toISOString()
      }

      // show confirmation and clear form
      setConfirmation(report)
      setSubmitted(true)
      setName('')
      setPhone('')
      setCategory('')
      setDescription('')
      setErrors({})
    }
  }

  if (submitted && confirmation) {
    return (
      <View style={styles.center}>
        <Text style={styles.successTitle}>Report Submitted!</Text>
        <View style={styles.confirmCard}>
          <Text style={styles.confirmText}>Route: {confirmation.routeId}</Text>
          <Text style={styles.confirmText}>Name: {confirmation.name}</Text>
          <Text style={styles.confirmText}>Category: {confirmation.category}</Text>
          <Text style={styles.confirmText}>Time: {confirmation.submittedAt}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Back to Details</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Report Issue</Text>
      <Text style={styles.subtitle}>For Route: {routeId}</Text>

      <Text style={styles.label}>Commuter Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Thabo" />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text style={styles.label}>SA Cellphone Number</Text>
      <TextInput 
        style={styles.input} 
        value={phone} 
        onChangeText={setPhone} 
        keyboardType="phone-pad" 
        placeholder="e.g. 0821234567" 
        maxLength={10}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <Text style={styles.label}>Issue Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="e.g. Delay, Safety" />
      {errors.category && <Text style={styles.error}>{errors.category}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        value={description} 
        onChangeText={setDescription} 
        multiline 
        placeholder="Describe the problem (min 20 chars)" 
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20, paddingTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  textArea: { height: 80, textAlignVertical: 'top' },
  error: { color: '#c62828', fontSize: 12, marginTop: 4 },
  submitBtn: { backgroundColor: '#1565c0', padding: 16, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  submitBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 },
  confirmCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, width: '100%', marginBottom: 20 },
  confirmText: { fontSize: 14, color: '#333', marginBottom: 8 },
  btn: { backgroundColor: '#1565c0', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
})