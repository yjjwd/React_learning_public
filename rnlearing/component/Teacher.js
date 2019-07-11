import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet } from 'react-native';


class TeacherScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Teacher Screen</Text>
          <Button
            title="Teacher->Mine"
            onPress={() => this.props.navigation.navigate('Mine')}
          />
        </View>
      );
    }
  }
