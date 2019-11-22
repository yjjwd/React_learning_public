/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator, createAppContainer,createNavigationContainer} from 'react-navigation'

import HomeScreen from './component/Home'
import LoginScreen from './component/Login'
import LoginView from './component/NewLogin'
import Search from './component/Search'

import {TabAppNavigator}  from './component/TabNavigation'

const HomeNavigator =createStackNavigator(
  {
    Home:HomeScreen,
    Search:Search
  }
)

const AppNavigator = createStackNavigator({
  Home: {
    screen:HomeNavigator,
    navigationOptions: ({navigation}) => ({header: null})
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({header: null})
  },
  Main: {
    screen: TabAppNavigator,
  },
  // Search:{
  //   screen:Search
  // }
}, {
  initialRouteName: 'Home',
  headerMode: 'screen'
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

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

// export default App;
