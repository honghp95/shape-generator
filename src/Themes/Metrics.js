import {Dimensions, Platform} from 'react-native'

const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 812
const {width, height} = Dimensions.get('window')

export function responsiveWidth(value = 0) {
  return (width * value) / DESIGN_WIDTH
}

export function responsiveHeight(value = 0) {
  return (height * value) / DESIGN_HEIGHT
}

export function responsiveFont(value = 0) {
  if (isIOS()) return (width * value) / DESIGN_WIDTH
  else {
    return (width * value) / DESIGN_WIDTH
  }
}

export function deviceWidth() {
  return width
}

export function deviceHeight() {
  return height
}

export function isIOS() {
  return Platform.OS === 'ios'
}
