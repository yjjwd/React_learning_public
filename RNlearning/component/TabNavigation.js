import React from 'react'
import MineScreen from './Mine'
import TeacherScreen from './Teacher'
import AssessScreen from './Assess'
import { TabNavigator } from 'react-navigation'

export const AppNavigator = TabNavigator(
  {
    Mine: { screen: MineScreen },
    Teacher: { screen: TeacherScreen },
    Assess: { screen: AssessScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: '#841584',
      inactiveTintColor: '#000',
      style: {
          backgroundColor: '#fff',
          paddingBottom: 1,
          borderTopWidth: 0.2,
          paddingTop:1,
          borderTopColor: '#ccc',
      },
      labelStyle: {
          fontSize: 11,
          margin: 1
      },
      indicatorStyle: {height: 0}
    },
    initialRouteName: 'Mine',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarPosition:'bottom',
  }
)
