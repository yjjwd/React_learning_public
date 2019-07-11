import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet } from 'react-native';


export default class AccessScreen extends React.Component {
  static navigationOptions = {
    title: '综合评价',
  };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Access Screen</Text>
          {/* <Button
            title="Access->Mine"
            onPress={() => this.props.navigation.navigate('Mine')}
          /> */}
        </View>
      );
    }
  }
