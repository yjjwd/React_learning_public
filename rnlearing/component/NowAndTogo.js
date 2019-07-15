import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button ,FlatList} from 'react-native';
import { MapView } from 'react-native-amap3d'

export default class NowAndToGo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            NowLocation:'',
            Togo:''
        }
    }
    Move() {
        const {NowLocation} = this.state
        //根据输入地址搜索，返回列表
      }
    render(){
        return(
            <View style={{flex:1 ,justifyContent:'center'}}>
                <TextInput style={styles.input} onChangeText={(NowLocation) => { this.setState({NowLocation}) }} value={this.state.NowLocation} placeholder={'我的位置'}></TextInput>
                <TextInput style={styles.input} onChangeText={(Togo) => { this.setState({Togo}) }} value={this.state.Togo} placeholder={'我想去'}></TextInput>
                <Text style={styles.login} onPress={ () => {this.Move()} }>Move</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40
  },
  input: {
    fontSize: 20,
    width: 500,
    margin: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#841584',
    padding: 5
  },
  login: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
    backgroundColor: '#841584',
    width: 150,
    height: 50,
    lineHeight: 50,
    textAlign: 'center'
  }
});
