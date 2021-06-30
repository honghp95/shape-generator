/**
 * Created by Hong HP on 6/29/21.
 */
import React, {useEffect, useImperativeHandle, useState, forwardRef} from 'react'
import {View, StyleSheet, ActivityIndicator, Animated} from 'react-native'
import {getColor, getImage} from '../utilities/ApiManage'
import {isConnected} from '../constants/constants'
import Svg, {ClipPath, Defs, Image, Polygon} from 'react-native-svg'
import {randomColor, randomInt} from '../utilities/utils'
import Colors from '../Themes/Colors'
import useFadeAnimation from '../hooks/useFadeAnimation'
import FastImage from 'react-native-fast-image'

const Triangle = forwardRef(({size, uri}, ref) => {
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
    const typeData = randomInt(1, 2)
    try {
      setLoading(true)
      if (typeData === 1) {
        const triangle = await getImage()
        setImage(triangle?.[0])
      } else {
        const triangleC = await getColor()
        setColor(triangleC?.[0])
      }
    } catch (e) {
      setColor({hex: randomColor()})
      setImage({})
    } finally {
      setStart(typeData === 1 ? 2000 : 1000)
      setLoading(false)
    }
  }

  return (
    <View>
      <Animated.View style={{opacity: opacity}}>
        <Svg width={size} height={size}>
          {!!color?.hex && (
            <Polygon points={`${size / 2} 0, ${size} ${size}, 0 ${size}`} fill={`#${color?.hex}`} />
          )}
          {!!image?.imageUrl && (
            <Defs>
              <ClipPath id="clip">
                <Polygon points={`${size / 2} 0, ${size} ${size}, 0 ${size}`} />
              </ClipPath>
            </Defs>
          )}
          {!!image?.imageUrl && (
            <Image
              width={size}
              height={size}
              href={{
                uri: image.imageUrl,
              }}
              clipPath="#clip"
            />
          )}
        </Svg>
      </Animated.View>
      {!!loading && <ActivityIndicator size={'small'} color={Colors.primary} style={styles.indicator} />}
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

export default Triangle
