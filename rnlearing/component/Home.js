import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button } from 'react-native';
import { MapView } from 'react-native-amap3d'

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
        Pos2: '',
        Pos3:'',
        Pos4:'',
        city:'',
        test:''
    }
}

 GetLongitudeAndLatitude = () => {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(
          location => {
             resolve([location.coords.longitude, location.coords.latitude]);
          },
          error => {
              reject(error);
          }
      );
  })
}

Getcity(){
    this.GetLongitudeAndLatitude()
    .then((posarr)=>{
      const longitude = posarr[0];
      const latitude  = posarr[1];
      fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location="+longitude+","+latitude+ "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
      .then(response=>response.json())
      .then(json=>{
      // const data=JSON.stringify(json.regeocodes.formatted_address);
        this.setState({
                city:json.regeocode.formatted_address
              })  
    })
  })
}

  componentDidMount() {
  this.Getcity();

    // setTimeout(() => {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //     const positionData=position.coords;
    //     let initialPosition = JSON.stringify(position);
            
    //       this.setState({
    //       Pos1:initialPosition,
    //       Pos3:positionData.longitude,
    //       Pos4:positionData.latitude,
    //     })
    //     },
    //     (error) => alert(error.message),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    
    // this._watchID = navigator.geolocation.watchPosition((position)=> {
    //     let lastPosition = JSON.stringify(position);
    //     this.setState({
    //         Pos2: lastPosition
    //     });
    // }, (error)=> {
    //     alert(error.message)
    // })
    // }, 0);
    // setTimeout(() => {
    //   fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location="+this.state.Pos3+","+this.state.Pos4+ "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
    //   .then(response=>response.json())
    //   .then(json=>{
    //     // const data=JSON.stringify(json.regeocodes.formatted_address);
    //         this.setState({
    //           city:json.regeocode.formatted_address
    //         })  
    //   });
    // }, 0);
}


    render() {
      return (
        // <View style={{flex: 1}}>
        //   <View style={{ flex: 6}}>
        //     <Image style={{flex:1}} source={require('../images/gzmap.png')} />
        //   </View>
        //   <View style={{flex:3,flexDirection:'column',justifyContent:'space-evenly'}}>
        //     <Text>{this.state.Pos1}</Text>
        //     <Text>{this.state.Pos2}</Text>
        //     <Text>{this.state.Pos3}</Text>
        //     <Text>{this.state.Pos4}</Text>
        //     <Text>{this.state.city}</Text>
        //   </View>
        //   <View style={{flex:1,justifyContent: 'flex-end'}}>
        //    <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} onPress={() => this.props.navigation.navigate('Mine')} title="我的课程"/>
        //   </View>
        // </View>
        <View style={styles.container}>
         <MapView style={styles.top} coordinate={{ latitude: 39.91095,longitude: 116.37296, }} />
          <View style={styles.middle}>
            <Text style={styles.item}>{this.state.city}</Text>
          </View>
          <View style={styles.bottom}>
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
        },
        title:{
            fontSize:40,
            fontWeight:'bold',
            marginBottom:20
        },
        top:{
          flex:6
        }
        ,
        middle:{
          flex:3,
          flexDirection:'column',
          justifyContent:'space-evenly',
          margin:10
        },
        bottom:{
          flex:1,
          justifyContent: 'flex-end'
        }
        ,item:{
           flex:1,
           fontSize: 30,
            width: 500,
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