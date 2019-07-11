/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {StackNavigator} from 'react-navigation'

import HomeScreen from './component/Home'
import LoginScreen from './component/Login'

import  AppNavigator  from './component/TabNavigation'

const App = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({header: null})
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({header: null})
  },
  Main: {
    screen: AppNavigator
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'screen'
})



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

export default App;
