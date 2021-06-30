/**
 * Created by Hong HP on 6/29/21.
 */
import React, {useEffect, useImperativeHandle, useState, forwardRef} from 'react'
import {Animated, StyleSheet, ActivityIndicator, View} from 'react-native'
import {getImage} from '../utilities/ApiManage'
import FastImage from 'react-native-fast-image'
import Colors from '../Themes/Colors'
import {isConnected} from '../constants/constants'
import {randomColor} from '../utilities/utils'
import useFadeAnimation from '../hooks/useFadeAnimation'

const Square = forwardRef(({size}, ref) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState({})
  const [color, setColor] = useState(!isConnected.current ? {hex: randomColor()} : {})
  const [opacity, setStart] = useFadeAnimation()
  useEffect(() => {
    if (isConnected.current) {
      handleGetData()
    } else {
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
      const square = await getImage()
      setImage(square?.[0])
    } catch (e) {
      setColor({hex: randomColor()})
      setImage({})
      setLoading(false)
    }
  }

  return (
    <View>
      <Animated.View
        style={{
          opacity: opacity,
          width: size,
          height: size,
          backgroundColor: color?.hex ? `#${color?.hex}` : null,
        }}>
        {!!image.imageUrl && (
          <FastImage
            source={{uri: image.imageUrl}}
            style={{width: size, height: size}}
            resizeMode={'cover'}
            onLoadEnd={() => {
              setLoading(false)
              setStart(1000)
            }}
            onError={() => {
              setLoading(false)
              setColor({hex: randomColor()})
            }}
          />
        )}
      </Animated.View>
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

export default Square
