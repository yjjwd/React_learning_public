import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button ,TouchableOpacity,FlatList} from 'react-native';
import { MapView } from 'react-native-amap3d'
import PropTypes from "prop-types";
import NowAndToGo from './NowAndTogo'
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
        longitude: '',
        latitude: '',
        Nowlongitude: '',
        Nowlatitude: '',
        Togolongitude:'',
        Togolatitude:'',
        Pos3:'',
        Pos4:'',
        city:'',
        test1:'null',
        test2:'null',
        logs: [],
        NowLocation:'当前位置',
        mode:'',
        Togo:'我想去',
        Searchlocation:'',
        findpath:false,
        zoom:18,
        monted:false,
        searched:false,
    }
}

getRad(d){
  return d*3.1415926/180.0;
}
//暂时使用的数学计算方法，在完善车辆统计后将替换为高德api的附近派单自带计算距离
 getGreatCircleDistance(lat1,lng1,lat2,lng2){
  var radLat1 = this.getRad(lat1)
  var radLat2 = this.getRad(lat2);
  
  var a = radLat1 - radLat2;
  var b = this.getRad(lng1) - this.getRad(lng2);
  
  var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s*6378137.0;
  s = Math.round(s*10000)/10000.0;
          
  return s;
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
                longitude:longitude
              })  
    }).catch((error)=>{
      console.log('request failed', error)
    })
  })
}

_GetSearchValue(val) //同页面子传父用函数
{
  this.setState({
    Searchlocation:val
});
}

  componentDidMount() {
    if(!this.state.monted)
    {
        this.Getcity();
        this.setState({monted:true})
    }

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


_logPressEvent = ({ nativeEvent }) => {
  this._log('onPress', nativeEvent)
  const longitude = nativeEvent.longitude;
  const latitude  =nativeEvent.latitude;
 if(nativeEvent.longitude!=this.state.Togolongitude&&nativeEvent.latitude!=this.state.Togolatitude){
  this.setState({
    Togolongitude:nativeEvent.longitude,
    Togolatitude:nativeEvent.latitude,
},()=>{ 
fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location="+longitude+","+latitude+ "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
.then(response=>response.json())
.then(json=>{
 this.setState({
         Togo:json.regeocode.formatted_address,
       })  
 }).catch((error)=>{
  console.log('request failed', error)
})
})
}
}

_logLongPressEvent = ({ nativeEvent }) => this._log('onLongPress', nativeEvent)
_logLocationEvent = ({ nativeEvent }) => this._log('onLocation', nativeEvent)
_logStatusChangeCompleteEvent = ({ nativeEvent }) =>
 {
   this._log('onStatusChangeComplete', nativeEvent)
  }

  NowLocationChange=({nativeEvent})=>{
    const longitude = nativeEvent.longitude;
    const latitude  =nativeEvent.latitude;
    if(this.state.searched==true) this.setState({searched:false})
   else if(nativeEvent.longitude!=this.state.longitude&&nativeEvent.latitude!=this.state.latitude){
    this.setState({
      Nowlongitude:nativeEvent.longitude,
      Nowlatitude:nativeEvent.latitude,
 },()=>{ 
  fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location="+longitude+","+latitude+ "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
 .then(response=>response.json())
 .then(json=>{
   this.setState({
           city:json.regeocode.formatted_address,
           NowLocation:json.regeocode.formatted_address
         })  
   }).catch((error)=>{
    console.log('request failed', error)
    })
  })
  }
}

_renderItem = ({ item }) =>
  <Text style={styles.logText}>{item.time} {item.event}: {item.data}</Text>

  Search()
  {
    this.props.navigation.navigate('Search');
  }

  componentWillMount()
  {
    const { params } = this.props.navigation.state;
    const Searchlocation = params ? params.Searchlocation : null;
    const mode=params ? params.Mode:null;
    if(Searchlocation)
    {
      const arr =Searchlocation.split(',')
      this.setState({
      Searchlocation:Searchlocation,
      longitude:arr[0],
      latitude:arr[1],
      monted:true,
      mode:mode,
      searched:true,
       },()=>{ 
        //  this.setState({test1:'oh'})
        fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location="+Searchlocation+ "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
       .then(response=>response.json())
       .then(json=>{
        // this.setState({test1:'ohhh'})
        if(mode=='Now')
         {
          this.setState({
            NowLocation:json.regeocode.formatted_address,
            Nowlongitude:arr[0],
            Nowlatitude:arr[1],
               })  
          }
          else if(mode=='To')
          {
           this.setState({
             Togo:json.regeocode.formatted_address,
             Togolongitude:arr[0],
             Togolatitude:arr[1],
           })  
          }

      }
         ).catch((error)=>{
          console.log('request failed', error)
      })
        });

      }
      if(this.state.NowLocation&&this.state.Togo)
      {
        this.setState({findpath:true})
        var distance=this.getGreatCircleDistance(this.state.Nowlatitude,this.state.Nowlongitude,this.state.Togolatitude,this.state.Togolongitude)
        this.setState({test:distance})
        if(0<=distance<=100) this.setState({zoom:18})
        if(100<=distance<=1000) this.setState({zoom:17})
        if(1000<=distance<=10000) this.setState({zoom:16})
        if(10000<=distance<=100000) this.setState({zoom:15})
        else this.setState({zoom:10})
      }
  }

Postdata(e)
{
  if(e=='Now')
  {
    this.props.navigation.navigate('Search',{Mode:'Now',Data:this.state.NowLocation})
  }
  if(e=='To')
  {
    this.props.navigation.navigate('Search',{Mode:'To',Data:this.state.Togo})
  }
}

    render() {
      const Pos ={
        Mainpos:{
        latitude: this.state.latitude*1,
        longitude: this.state.longitude*1
      },
        Nowpos:{
          latitude: this.state.Nowlatitude*1,
          longitude: this.state.Nowlongitude*1
        },
        Togopos:{
          latitude: this.state.Togolatitude*1,
          longitude: this.state.Togolongitude*1
        },

    }

      //测试navigatin传值用
      // const { params } = this.props.navigation.state;
      // const Searchlocation = params ? params.Searchlocation : null;
      //！！！严重错误，不要在render里setstate,会导致无限重构
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
          zoomLevel={this.state.zoom}
          locationEnabled
          locationInterval={10000}
          distanceFilter={10}
          onPress={this._logPressEvent}
          onLongPress={this._logLongPressEvent}
          onLocation={this._logLocationEvent}
          onStatusChangeComplete={this.NowLocationChange}
          style={styles.top}
          >
            <MapView.Marker
              draggable
              title='我要去'
              onDragEnd={this._onDragEvent}
              onInfoWindowPress={this._onInfoWindowPress}
              coordinate={Pos.Togopos}
            />
            <MapView.Marker image="flag" coordinate={Pos.Nowpos}>
              <View style={styles.defaultbox}>
              {/* <Image  source={require('../images/car_icon.png')} resizeMode={'contain'} /> */}
                <Text>我的位置</Text>
              </View>
            </MapView.Marker>
          </MapView>
        <View style={styles.middle}>
          {/* <Text style={styles.item}>{this.state.city}</Text> */}
        {/* <FlatList
          style={styles.logs}
          data={this.state.logs}
          renderItem={this._renderItem}
        /> */}
        {/* <Text style={styles.input}>测试{this.state.mode}+{this.state.test1}+{this.state.test2}+{this.state.Searchlocation},{this.state.Nowlatitude}</Text> */}
        {/* <Text style={styles.input}>传值测试:{this.state.NowLocation}</Text> */}
        {/* <Text style={styles.input}>计算距离:{this.state.test}</Text> */}
        <TouchableOpacity style={{flex:1 ,justifyContent:'center'}}>
                <Text style={styles.input} onPress={(event) => this.Postdata('Now')} key='Now'>{this.state.NowLocation}</Text>
                <Text style={styles.input} onPress={(event) => this.Postdata('To')} key='To'>{this.state.Togo}</Text>
                <Text style={styles.login} onPress={ () => {this.Move()} }>Move</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
        {/* <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} color='purple' onPress={() => this.props.navigation.navigate('Search')} title="搜索功能预览"/> */}
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
        input: {
          fontSize: 20,
          width: 500,
          margin: 10,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#841584',
          padding: 5
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