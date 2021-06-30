import {SHAPE} from '../constants/constants'

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomColor() {
  return (((Math.random() * 0xf0f0f0) << 0).toString(16) + '0').substring(0, 6)
}

export function randomShape() {
  const arr = [SHAPE.triangle, SHAPE.circle, SHAPE.square]
  return arr[randomInt(0, 2)]
}

export function calcDistance(x1, y1, x2, y2) {
  let dx = Math.abs(x1 - x2)
  let dy = Math.abs(y1 - y2)
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

let timeout
export function debounce(callback, time = 500) {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    callback?.()
  }, time)
}
