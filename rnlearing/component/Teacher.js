import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet } from 'react-native';


export default class TeacherScreen extends React.Component {
  static navigationOptions = {
    title: '我的导师',
  };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Teacher Screen</Text>
          {/* <Button
            title="Teacher->Mine"
            onPress={() => this.props.navigation.navigate('Mine')}
          /> */}
        </View>
      );
    }
  }
