// Q3 main wrapper with auth gate

import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { AppProvider, useApp } from './context/AppContext'
import AuthScreen from './screens/AuthScreen'
import Q3Navigator from './Q3Navigator'

function AuthGate() {
  const { user, authChecked } = useApp()

  if (!authChecked) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1565c0" />
      </View>
    )
  }

  return user ? <Q3Navigator /> : <AuthScreen />
}

export default function Q3App() {
  return (
    <AppProvider>
      <AuthGate />
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }
})