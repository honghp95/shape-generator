/**
 * Created by Hong HP on 6/28/21.
 */
import React, {useCallback, useRef} from 'react'
import {Animated, PanResponder} from 'react-native'
import {calcDistance, randomInt} from '../utilities/utils'
import {SHAPE} from '../constants/constants'
import {deviceWidth} from '../Themes/Metrics'
import Triangle from './Triangle'
import Square from './Square'
import Circle from './Circle'

function ShapeItem({type, x = 0, y = 0}) {
  const position = useRef(new Animated.ValueXY()).current
  const size = useRef((randomInt(10, 45) * deviceWidth()) / 100).current
  const count = useRef(0)
  const timeClick = useRef()
  const shapeRef = useRef()
  const scaleRef = useRef(new Animated.Value(1)).current
  const currentScale = useRef(1)
  const changeScale = useRef(1)
  const isMove = useRef(false)
  const initScale = useRef(0)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        handleDoubleClick()
      },
      onPanResponderMove: (evt, gestureState) => {
        let touches = evt.nativeEvent.touches
        if (touches.length === 2) {
          //Pinch
          let touch1 = touches[0]
          let touch2 = touches[1]
          if (!initScale.current) {
            initScale.current = calcDistance(touch1.pageX, touch1.pageY, touch2.pageX, touch2.pageY)
          } else {
            handleZoom(
              calcDistance(touch1.pageX, touch1.pageY, touch2.pageX, touch2.pageY) / initScale.current,
            )
          }
        } else if (touches.length === 1) {
          //Move
          if (!isMove.current) {
            position.setOffset({
              x: position.x._value,
              y: position.y._value,
            })
          }
          position.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          })
          isMove.current = true
        }
      },
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderTerminate: handlePanResponderEnd,
    }),
  ).current

  function handlePanResponderEnd() {
    if (isMove.current) {
      position.flattenOffset()
      isMove.current = false
    }
    initScale.current = 0
    handleEndZoom()
  }

  const handleDoubleClick = useCallback(() => {
    count.current++
    if (count.current === 2) {
      shapeRef.current?.getData()
      count.current = 0
      clearTimeout(timeClick.current)
    } else {
      timeClick.current = setTimeout(() => {
        count.current = 0
      }, 500)
    }
  }, [])

  function renderItem() {
    switch (type) {
      case SHAPE.square:
        return <Square size={size} ref={shapeRef} />
      case SHAPE.circle:
        return <Circle size={size} ref={shapeRef} />
      case SHAPE.triangle:
        return <Triangle size={size} ref={shapeRef} />
    }
  }

  function handleZoom(scale) {
    let value
    if (scale > 1) {
      value = currentScale.current + scale - 1
    } else {
      value = currentScale.current * scale
    }
    changeScale.current = value
    scaleRef.setValue(value)
  }

  function handleEndZoom() {
    currentScale.current = changeScale.current
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          position: 'absolute',
          transform: [{translateX: position.x}, {translateY: position.y}, {scale: scaleRef}],
          top: y - size / 2,
          left: x - size / 2,
        },
      ]}>
      {renderItem()}
    </Animated.View>
  )
}

export default ShapeItem
