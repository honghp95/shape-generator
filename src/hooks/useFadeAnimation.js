/**
 * Created by Hong HP on 6/29/21.
 */
import {useState} from 'react'
import {Animated} from 'react-native'

export default function useFadeAnimation() {
  const [animation] = useState(new Animated.Value(0))

  function startAnimation(duration = 1000) {
    Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start()
  }

  return [animation, startAnimation]
}
