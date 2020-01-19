/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator, createAppContainer,DrawerNavigator,createDrawerNavigator} from 'react-navigation'

import HomeScreen from './component/Home'
import LoginScreen from './component/Login'
import LoginView from './component/NewLogin'
import Search from './component/Search copy'
import Search2 from './component/Search-'
import MessageScreen from './component/Message'
import OrderFormScreen from './component/OrderForm'

import {TabAppNavigator}  from './component/TabNavigation'

const HomeNavigator =createStackNavigator(
  {
    Home:HomeScreen,
    Search:Search
  }
)

const AppNavigator = createDrawerNavigator({
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
  OrderFrom:{
    screen:OrderFormScreen,
  },
  Message: {
    screen:MessageScreen,
  },
  Test:{
    screen:Search,
  }
  // Search:{
  //   screen:Search
  // }
}, {
  initialRouteName: 'Home',
  headerMode: 'screen'  ,
  hideStatusBar: true,
  drawerWidth:200,
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  drawerType:'front',
  hideStatusBar:false,
  overlayColor: 'rgba(135, 206, 250,.4)',
  contentOptions: {
  activeTintColor: '#fff',
  activeBackgroundColor: '#87CEFA',

  },
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
