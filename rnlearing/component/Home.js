import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,Button ,TouchableOpacity,FlatList} from 'react-native';
import { MapView } from 'react-native-amap3d'
import PropTypes from "prop-types";
import NowAndToGo from './NowAndTogo'
import {NavigationEvents} from 'react-navigation'

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
        city:'',
        test1:'null',
        test2:'null',
        test3:'null',
        logs: [],
        NowLocation:'当前位置',
        mode:'null',
        Togo:'我想去',
        Searchlocation:'',
        findpath:false,
        zoom:18,
        monted:false,
        searched:false,
        testlog:[1,2,3,4],
        temp:'',
        testroute:[
          {
            latitude: 23.0830,
            longitude: 113.4749,
          },
          {
            latitude: 25.806901,
            longitude: 114.257972,
          },
          {
            latitude: 26.806901,
            longitude: 115.457972,
          },
          {
            latitude: 27.806901,
            longitude: 114.597972,
          },
        ],
    }
}

getRad(d){
  return d*3.1415926/180.0;
}
//暂时使用的数学计算方法
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
    this.setState({counter:this.state.counter+1})
    if(!this.state.monted)
    {
        this.Getcity();
        this.setState({monted:true})
    }
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
this.CheckMap()
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
    if(this.state.searched==true) this.setState({test:false}) //暂时弃用搜索标记
   else if(nativeEvent.longitude!=this.state.Nowlongitude||nativeEvent.Nowlatitude!=this.state.latitude){
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
  this.CheckMap()
}

_renderItem = ({ item }) =>
  <Text style={styles.logText}>{item.time} {item.event}: {item.data}</Text>

  Search()
  {
    this.props.navigation.navigate('Search');
  }

  SearchCallBack(mode,Searchlocation)
  {
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
        fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location="+Searchlocation+ "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
       .then(response=>response.json())
       .then(json=>{
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
      this.CheckMap()
  }
  CheckMap()
    {
      if(this.state.Nowlatitude&&this.state.Togolatitude)
      {
        this.setState({findpath:true})
        var distance=this.getGreatCircleDistance(this.state.Nowlatitude,this.state.Nowlongitude,this.state.Togolatitude,this.state.Togolongitude)
        this.setState({test:distance,zoom:3})
        if(distance<=500) {this.setState({zoom:18})}
        else if(distance<=1000) {this.setState({zoom:15})}
        else if(distance<=10000) {this.setState({zoom:10})}
        else if(distance<=100000) {this.setState({zoom:8})}
        else if(distance<=1000000) {this.setState({zoom:7})}
        else if(distance<=1000000) {this.setState({zoom:4})}
        else this.setState({zoom:4})
      }
    }

Postdata(e)
{
  if(e=='Now')
  {
    this.props.navigation.navigate('Search',{Mode:'Now',Data:this.state.NowLocation,callback:(mode,Searchlocation)=>{this.SearchCallBack(mode,Searchlocation)} })
  }
  if(e=='To')
  {
    this.props.navigation.navigate('Search',{Mode:'To',Data:this.state.Togo,callback:(mode,Searchlocation)=>{this.SearchCallBack(mode,Searchlocation)}})
  }
}
 //定义全局object数组
_routeline = 
[

]

// Convert(str)
// {
//     for(var i=0;i<def.length;i++)
//     {
//       var temp = def[i].split(",")
//       this._routeline[i]= "latitude:"+temp[0]+','+"longitude"+temp[1]+','+'!'
//       this.setState({test:"avc"})
//     }
// }

Route()
{
  this._routeline=[]
  fetch("https://restapi.amap.com/v3/direction/driving?key=4df0ef52b83b532834ffa118afa77de5&origin="+this.state.Nowlongitude+","+this.state.Nowlatitude+"&destination="+this.state.Togolongitude+","+this.state.Togolatitude+"&originid=&destinationid=&extensions=base&strategy=0&waypoints=116.357483,39.907234&avoidpolygons=&avoidroad=")
  .then(response=>response.json())
  .then(json=>{
    this.setState({temp:json.route.paths[0].steps[0].polyline})
    // this.Convert(this.state.temp)
    // this.setState({test:this._routeline})
    const def = String(this.state.temp).split(';') //将原始数据按分号隔开，每组为latitude，longitude

    for(var i=0;i<def.length;i++) //循环写入值
    {
      if(!this._routeline[i]) { this._routeline[i]={} }
      const temp = String(def[i]).split(",") //再次分割，0为latitude,1为longitude
      this._routeline[i].latitude=temp[0]*1
      this._routeline[i].longitude=temp[1]*1
      this.setState({test3:def.length})//用于确认temp确实读到值了
    }
    //测试用数组
    // const a=[
    //   {
    //     latitude: 23.0450,
    //     longitude: 113.3639,
    //   },
    //   {
    //     latitude: 25.806901,
    //     longitude: 114.257972,
    //   },
    //   {
    //     latitude: 26.806901,
    //     longitude: 115.457972,
    //   },
    //   {
    //     latitude: 27.806901,
    //     longitude: 114.597972,
    //   },
    // ]
    // const arry = this._routeline.split(";")
    this.setState({testroute:this._routeline,test1:this._routeline[0].longitude,test2:this._routeline[0].latitude})
 }
    ).catch((error)=>{
     console.log('request failed', error)
 })

}

componentWillMount()
{

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
    // const _routeline1=[
	  //   {
	  //     latitude: 23.0430,
	  //     longitude: 113.3649,
	  //   },
	  //   {
	  //     latitude: 25.806901,
	  //     longitude: 114.257972,
	  //   },
	  //   {
	  //     latitude: 26.806901,
	  //     longitude: 115.457972,
	  //   },
	  //   {
	  //     latitude: 27.806901,
	  //     longitude: 114.597972,
	  //   },
	  // ]
    const { navigation } = this.props;
    const mode =navigation.getParam('Mode', null);
    const Searchlocation = navigation.getParam('Searchlocation',null)
      //！！！严重错误，不要在render里setstate,会导致无限重构
      return (
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
	        showsScale={true}
	        showsLocationButton={true}
	        showsZoomControls={true}
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
                <Text>我的位置</Text>
              </View>
            </MapView.Marker>
            <MapView.Polyline
	          width={5}
	          color="rgba(255, 0, 0, 0.5)"
	          coordinates={this.state.testroute}
	        />
          </MapView>
        <View style={styles.middle}>
        <Text style={styles.input}>测试:{this.state.test1},{this.state.test2}+{this.state.test3}</Text>
        <TouchableOpacity style={{flex:1 ,justifyContent:'center'}}>
                <Text style={styles.input} onPress={(event) => this.Postdata('Now')} key='Now'>{this.state.NowLocation}</Text>
                <Text style={styles.input} onPress={(event) => this.Postdata('To')} key='To'>{this.state.Togo}</Text>
                <Text style={styles.login} onPress={(event) => {this.Move()} }>Move</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
         {/* <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} onPress={() => this.props.navigation.navigate('Mine')} title="我的课程"/> */}
         <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} onPress={() => this.props.navigation.navigate('Login')} title="登陆测试"/>
         <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} onPress={()=>this.Route()} title="路径测试"/>
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