/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react'
import type {Node} from 'react'
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native'
import AppNavigation from './src/navigation/AppNavigator'
import NetInfo from '@react-native-community/netinfo'
import {isConnected} from './src/constants/constants'

export const AppContext = React.createContext({
  isConnected: false,
})

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      isConnected.current = state.isConnected
    })

    return () => {
      unsubscribe()
    }
  })

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigation />
    </View>
  )
}

export default App
