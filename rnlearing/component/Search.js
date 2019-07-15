import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button ,FlatList} from 'react-native';
import { MapView } from 'react-native-amap3d'

class list extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          ...this.props.course
        }
      }

      render() {
        return (
          <View style={styles.container}>
            <Image style={styles.img} source={this.state.pic} resizeMode={'contain'} />
            <View style={styles.course}>
              <Text style={styles.title}>{this.state.name}</Text>
              <View style={styles.introduction}>
                {
                  this.state.target.map((item) => {
                    return (<Text>{item}</Text>)
                  })
                }
              </View>
            </View>
          </View>
        );
      }
}

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
            datastr:'',
            data:[],
        }
    }
    GetData()
    {
        fetch("https://restapi.amap.com/v3/assistant/inputtips?key=4df0ef52b83b532834ffa118afa77de5&keywords=肯德基&type=050301&location=116.481488,39.990464&city=北京&datatype=all")
        .then(response=>response.json())
        .then(json=>{
          this.setState({
                 datastr:JSON.stringify(json)
                })      
        })
    }
    componentDidMount()
    {
        this.GetData()
    }
    render(){
        return(
            <View style={{flex:1 ,justifyContent:'center'}}>
               <Text styles={styles.input}>数据：{this.state.datastr}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
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
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        height: 100
      },
      img: {
        width: 100,
        height: 100
      },
      course: {
        marginLeft: 20
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
      },
      introduction: {
        width: 260,
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'justify',
        marginTop: 5
      }
  });