import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import RouteKey from './RouteKey'
import {navigationRef} from './NavigationService'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CustomTabBar from './CustomTabBar'
import SquareScreen from '../screens/SquareScreen'
import CircleScreen from '../screens/CircleScreen'
import TriangleScreen from '../screens/TriangleScreen'
import AllShapeScreen from '../screens/AllShapeScreen'
const Tab = createBottomTabNavigator()

function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} lazy>
        <Tab.Screen name={RouteKey.SquareScreen} component={SquareScreen} />
        <Tab.Screen name={RouteKey.CircleScreen} component={CircleScreen} />
        <Tab.Screen name={RouteKey.TriangleScreen} component={TriangleScreen} />
        <Tab.Screen name={RouteKey.AllShapeScreen} component={AllShapeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
