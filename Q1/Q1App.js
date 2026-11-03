// navigation wrapper for Q1

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import RouteDetailsScreen from './screens/RouteDetailsScreen'
import ReportIssueScreen from './screens/ReportIssueScreen'

const Stack = createNativeStackNavigator()

export default function Q1App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Routes' }} />
        <Stack.Screen name="RouteDetails" component={RouteDetailsScreen} options={{ title: 'Details' }} />
        <Stack.Screen name="ReportIssue" component={ReportIssueScreen} options={{ title: 'Report' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}