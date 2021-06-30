/**
 * Created by Hong HP on 6/28/21.
 */
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, PanResponder} from 'react-native'
import ShapeItem from '../common/ShapeItem'
import {SHAPE, TimeShake} from '../constants/constants';
import RNShake from 'react-native-shake';
import {debounce} from '../utilities/utils';

function CircleScreen() {
  const [listShape, setListShape] = useState([])
  const listShapeRef = useRef(listShape)
  const countShake = useRef(0)

  useEffect(() => {
    RNShake.addListener(() => {
      countShake.current++
      if (countShake.current >= TimeShake) {
        listShapeRef.current = []
        setListShape(listShapeRef.current)
        countShake.current = 0
      }
      debounce(() => {
        countShake.current = 0
      })
    })
    return () => {
      RNShake.removeListener()
    }
  }, [])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        listShapeRef.current.push({
          x: gestureState.x0,
          y: gestureState.y0,
          type: SHAPE.circle,
        })
        setListShape([...listShapeRef.current])
      },
    }),
  ).current

  return (
    <View style={styles.container}>
      <View style={styles.container} {...panResponder.panHandlers} />
      {listShape.map((item, index) => {
        return <ShapeItem x={item.x} y={item.y} type={item.type} key={index.toString()} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default CircleScreen
