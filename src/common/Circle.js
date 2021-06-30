/**
 * Created by Hong HP on 6/29/21.
 */
import React, {useEffect, useImperativeHandle, useState, forwardRef} from 'react'
import {View, StyleSheet, ActivityIndicator, Animated} from 'react-native'
import {getColor} from '../utilities/ApiManage'
import Colors from '../Themes/Colors'
import {randomColor} from '../utilities/utils'
import {isConnected} from '../constants/constants'
import useFadeAnimation from '../hooks/useFadeAnimation'

const Circle = forwardRef(({size}, ref) => {
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState(!isConnected.current ? {hex: randomColor()} : {})
  const [opacity, setStart] = useFadeAnimation()

  useEffect(() => {
    if (isConnected.current) {
      handleGetData()
    }  else {
      setStart(1000)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getData() {
      handleGetData()
    },
  }))

  async function handleGetData() {
    try {
      setLoading(true)
      const color = await getColor()
      setColor(color?.[0])
    } catch (e) {
      setColor({hex: randomColor()})
    } finally {
      setLoading(false)
      setStart(1000)
    }
  }

  return (
    <View>
      <Animated.View
        style={{
          width: size,
          height: size,
          backgroundColor: `#${color?.hex}`,
          borderRadius: size / 2,
          overflow: 'hidden',
          opacity: opacity,
        }}
      />
      {loading && <ActivityIndicator size={'small'} color={Colors.primary} style={styles.indicator} />}
    </View>
  )
})

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignSelf: 'center',
    zIndex: 999,
  },
})

export default Circle
