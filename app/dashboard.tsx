import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import api from '../lib/api'

export default function Dashboard() {
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/subscriptions')
        console.log('SUBSCRIPTIONS', res.data)
      } catch (e) {
        console.log('DASHBOARD ERROR', e)
        setError(true)
      }
    }

    load()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard Loaded</Text>
      {error && <Text style={{ color: 'red' }}>403 Unauthorized</Text>}
    </View>
  )
}



