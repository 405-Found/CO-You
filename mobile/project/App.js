import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'

export default function App() {
  return <MyWeb />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CarbonIO: {
    height: '100%',
    width: '100%',
  },
})

const MyWeb = () => {
  return (
    <WebView
      source={{ uri: 'https://infinite.red' }}
      style={{ marginTop: 20 }}
    />
  )
}
