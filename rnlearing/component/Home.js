import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button ,FlatList} from 'react-native';
import { MapView } from 'react-native-amap3d'
import PropTypes from "prop-types";

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
        longtitude: '',
        latitude: '',
        Pos3:'',
        Pos4:'',
        city:'',
        test:'',
        logs: []
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
                city:json.regeocode.formatted_address,
                latitude:latitude,
                longtitude:longitude
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
//标识用函数
_onMarkerPress = () => Alert.alert('onPress')
_onInfoWindowPress = () => Alert.alert('onInfoWindowPress')
_onDragEvent = ({ nativeEvent }) => Alert.alert(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
//事件反馈用函数
_log(event, data) {
  this.setState({
    logs: [
      {
        key: Date.now().toString(),
        time: new Date().toLocaleString(),
        event,
        data: JSON.stringify(data, null, 2),
      },
      ...this.state.logs,
    ],
  })
}

_logPressEvent = ({ nativeEvent }) => this._log('onPress', nativeEvent)
_logLongPressEvent = ({ nativeEvent }) => this._log('onLongPress', nativeEvent)
_logLocationEvent = ({ nativeEvent }) => this._log('onLocation', nativeEvent)
_logStatusChangeCompleteEvent = ({ nativeEvent }) => this._log('onStatusChangeComplete', nativeEvent)

_renderItem = ({ item }) =>
  <Text style={styles.logText}>{item.time} {item.event}: {item.data}</Text>


    render() {
      const Pos ={
        Mainpos:{
        latitude: this.state.latitude*1,
        longitude: this.state.longtitude*1
      },
      secpos:{
        latitude: this.state.latitude*1-0.005,
        longitude: this.state.longtitude*1-0.005
      }
      };
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
          <MapView
        coordinate={Pos.Mainpos}
        zoomLevel={18}
        locationEnabled
        locationInterval={10000}
        distanceFilter={10}
        onPress={this._logPressEvent}
        onLongPress={this._logLongPressEvent}
        onLocation={this._logLocationEvent}
        onStatusChangeComplete={this._logStatusChangeCompleteEvent}
        style={styles.top}
        >
            <MapView.Marker
              draggable
              title='这是一个可拖拽的标记'
              onDragEnd={this._onDragEvent}
               onInfoWindowPress={this._onInfoWindowPress}
              coordinate={Pos.secpos}
            />
            <MapView.Marker image="car_icon" coordinate={Pos.Mainpos}>
              <View style={styles.defaultbox}>
              {/* <Image  source={require('../images/car_icon.png')} resizeMode={'contain'} /> */}
                <Text>最近的出租车</Text>
              </View>
            </MapView.Marker>
          </MapView>
        <View style={styles.middle}>
          <Text style={styles.item}>{this.state.city}</Text>
        <FlatList
          style={styles.logs}
          data={this.state.logs}
          renderItem={this._renderItem}
        />
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
        },
        defaultbox:{
          width:90,
          backgroundColor:"pink",
          margin: 20,
        } ,
         body: {
          flex: 1,
        },
        logs: {
          elevation: 8,
          flex: 1,
          backgroundColor: '#fff',
        },
        logText: {
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
        },
    }
);