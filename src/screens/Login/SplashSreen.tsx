import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashSreen = () => {
  return (
    <View style={{backgroundColor: 'white', width: '100%', height:'100%',justifyContent:'center', alignContent: 'center', alignItems:'center'}}>
      <Image source={require('../../asset/image/logolata.png')}/>
    </View>
  )
}

export default SplashSreen

const styles = StyleSheet.create({})