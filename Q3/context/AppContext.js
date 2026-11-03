// holds user and booking count

import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [bookingCount, setBookingCount] = useState(0)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // listen for auth changes
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setAuthChecked(true)
    })
    return () => unsub()
  }, [])

  return (
    <AppContext.Provider value={{
      user,
      bookingCount,
      setBookingCount,
      authChecked
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}