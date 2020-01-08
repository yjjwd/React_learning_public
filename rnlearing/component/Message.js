import  React,{Component} from 'react'
import {View,Text} from 'react-native'

export default class MessageScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Message Screen</Text>
        </View>
      );
    }
  }