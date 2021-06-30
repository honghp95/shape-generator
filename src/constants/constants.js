/**
 * Created by Hong HP on 6/28/21.
 */
import * as React from 'react';
import {isIOS} from '../Themes/Metrics';
export const SHAPE = {
  square: 'square',
  triangle: 'triangle',
  circle: 'circle',
}

export const isConnected = React.createRef(true)

export const TimeShake = isIOS() ? 1 : 8
