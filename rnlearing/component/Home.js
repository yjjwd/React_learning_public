import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button } from 'react-native';

// export default class HomeScreen extends Component{
//     constructor(props){
//         super(props)
//         this.state={

//         }
//     }
//     componentDidMount(){}

//     render(){
//         return(
//             <View style ={styles.container}>
//               <Text style={styles.titl}>这是一个主页</Text>
//             </View>
//         );
//     }
// }

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  _watchID;
  constructor(props) {
    super(props);
    this.state = {
        Pos1: '',
        Pos2: ''
    }
}
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let initialPosition = JSON.stringify(position);
            this.setState({
                Pos1: initialPosition
            });
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this._watchID = navigator.geolocation.watchPosition((position)=> {
        let lastPosition = JSON.stringify(position);
        this.setState({
            Pos2: lastPosition
        });
    }, (error)=> {
        alert(error.message)
    })
  }
    render() {
      return (
        <View style={{flex: 1}}>
          <View style={{ flex: 6}}>
            <Image style={{flex:1}} source={require('../images/gzmap.png')} />
          </View>
          <View style={{flex:3,flexDirection:'row',justifyContent:'space-evenly'}}>
            <Text>this.state.pos1</Text>
          </View>
          <View style={{flex:1,justifyContent: 'flex-end'}}>
           <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} onPress={() => this.props.navigation.navigate('Mine')} title="我的课程"/>
          </View>
        </View>
              )
    }
  }

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white'
        },
        title:{
            fontSize:40,
            fontWeight:'bold',
            marginBottom:20
        },
        input:{
            fontSize: 20,
            width: 300,
            margin: 10,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: '#841584',
            padding: 5,
            marginBottom:20
        },
        login:{
            fontSize:24,
            fontWeight:'bold',
            color: 'white',
            margin: 20,
            backgroundColor: 'orange',
            width: 150,
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
   
        }
    }
);