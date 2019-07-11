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

// import {
//   StackNavigator,
// } from 'react-navigation';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import {StackNavigator} from 'react-navigation'

import HomeScreen from './component/Home.js'
import LoginScreen from './component/Login.js'

import { AppNavigator } from './components/TabNavigation.js'
const App = StackNavigator({
  Welcome: {
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

// class HomeScreen extends React.Component {
//    render() { 
//      return ( 
//      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text> </View> ); }
//        } 
       
// const AppNavigator = createStackNavigator({ Home: { screen: HomeScreen } });
// export default createAppContainer(AppNavigator); 

// const HomeStack = createStackNavigator({HomeScreen});
// const MineStack = createStackNavigator({Mine});

// const StackNavigator = createStackNavigator( //顶部导航栏
//   {
//       Home,
//       Mine,
//   },
//   {
//       initialRouteName: 'Home',
//       defaultNavigationOptions: {
//           headerStyle: {
//               // backgroundColor: '#f4511e',
//           },
//           headerBackTitle: null,
//           // headerTintColor: '#fff',
//           headerTitleStyle: {
//               fontWeight: 'bold',
//           },
//           header: null
//       }
//   }
// )

// const BottomTabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     Mine: {
//       screen: MineScreen,
//     },
//     Login:{
//       screen:LoginScreen,
//     }
//   },  
//   {
//       initialRouteName: 'Home', //第一次加载时初始选项卡路由的 routeName
//       order: ['Mine','Home','Login'], //定义选项卡顺序的 routeNames 数组
//       tabBarOptions: {
//           activeTintColor: 'red',//标签和图标选中颜色
//           activeBackgroundColor: 'yellow',//导航选中背景色
//           inactiveTintColor: '#000', //标签和图标未选中颜色
//           inactiveBackgroundColor: 'white',//导航未选中背景色
//           showIcon: true,//是否显示 Tab 的图标,默认不显示
//           style: {
//               backgroundColor: 'yellow',//tabBar背景色
//               height: 49
//           },
//           // labelStyle 选项卡标签的样式对象
//           // tabStyle 选项卡的样式对象
//       },
//   }
// )



// const RootStack = StackNavigator(BottomTabNavigator); //底部导航

// export default class App extends Component {
//   render() {
//       return (
//           <RootStack/>
//       )
//   }
// }

// const App =()=>{
//   return (
//     <Login></Login>
//   )
// }
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
