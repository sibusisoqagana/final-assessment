// navigation for Q3

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import AddBookingScreen from './screens/AddBookingScreen'

const Stack = createNativeStackNavigator()

export default function Q3Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Bookings' }} />
        <Stack.Screen name="AddBooking" component={AddBookingScreen} options={{ title: 'New Booking' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}