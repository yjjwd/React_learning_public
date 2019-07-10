/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import HelloWorldApp from './components/hello.js'
import Login from './components/login.js'

const App =()=>{
  return (
    <Login></Login>
  )
}
// const App = StackNavigator({
//   Main: {screen: MainScreen},
//   Profile: {screen: ProfileScreen},
// });

// class MainScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <Button
//         title="To Login"
//         onPress={() =>
//           navigate('Profile')
//         }
//       />
//     );
//   }
// }

// class ProfileScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Login',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return(
//     <Login></Login>
//     )
//   }
// }

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
