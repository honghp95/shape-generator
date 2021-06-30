import {Dimensions, Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useRef} from 'react'
import RouteKey from './RouteKey'

import {SafeAreaView} from 'react-native-safe-area-context'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../Themes/Colors'

const {width, height} = Dimensions.get('window')
const itemUnit = width / 4
const pad = (itemUnit - responsiveWidth(60)) / 2
function CustomTabBar({navigation, state}) {
  const selectedTabIndex = state.index
  const position = useRef(new Animated.Value(pad)).current

  function handleChangePosition(index) {
    Animated.timing(position, {
      toValue: pad + index * itemUnit,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  function renderItem({route, title, selected, icon, activeColor, index}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={route}
        style={styles.itemContainer}
        onPress={() => {
          if (route) {
            handleChangePosition(index)
            navigation.navigate(route)
          }
        }}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={25} color={selected ? Colors.primary : Colors.gray} />
        )}
        <Text style={[styles.title, selected && {color: activeColor}]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={{height: 2, backgroundColor: Colors.grayLight, width: '100%'}}>
        <Animated.View style={[styles.indicator, {transform: [{translateX: position}]}]} />
      </View>
      <View style={styles.wrapper}>
        {renderItem({
          route: RouteKey.SquareScreen,
          selected: selectedTabIndex === 0,
          activeColor: Colors.primary,
          icon: 'square',
          title: 'Square',
          index: 0,
        })}
        {renderItem({
          route: RouteKey.CircleScreen,
          selected: selectedTabIndex === 1,
          activeColor: Colors.primary,
          icon: 'circle',
          title: 'Circle',
          index: 1,
        })}
        {renderItem({
          route: RouteKey.TriangleScreen,
          selected: selectedTabIndex === 2,
          activeColor: Colors.primary,
          icon: 'triangle',
          title: 'Triangle',
          index: 2,
        })}
        {renderItem({
          route: RouteKey.AllShapeScreen,
          selected: selectedTabIndex === 3,
          activeColor: Colors.primary,
          icon: 'shape',
          title: 'All Shape',
          index: 3,
        })}
      </View>
    </SafeAreaView>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
  container: {
    maxHeight: 80,
    backgroundColor: Colors.white,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(48),
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: responsiveFont(12),
    color: Colors.gray,
  },
  indicator: {
    width: responsiveWidth(60),
    height: 2,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
})
