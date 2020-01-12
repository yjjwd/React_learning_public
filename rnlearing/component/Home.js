import React, { Component } from 'react'
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Button, FlatList, Alert, NativeMethodsMixin } from 'react-native';
import { MapView } from 'react-native-amap3d'
// import Button from 'antd-mobile-rn/lib/button'
import PropTypes from "prop-types";
import NowAndToGo from './NowAndTogo'
import { NavigationEvents } from 'react-navigation'
import { MultiPoint } from './Multipoint'
import { DriversPos } from './DriversPos.js'

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var screenWidth = width;

export default class HomeScreen extends React.Component {

  _watchID;
  constructor(props) {
    super(props);
    this.state = {
      longitude: '', //现在位置逆地理编码中存储的经纬度和转化结果（可优化）
      latitude: '',
      city: '',

      Nowlongitude: '', //现在位置
      Nowlatitude: '',
      Togolongitude: '', //想要去
      Togolatitude: '',
      Driverlatitude: '23.0526',
      Driverlongitude: '113.3955',
      PreRoutePointLatitude:'',
      PreRoutePointLongtitude:'',
      NextRoutePointLatitude:'',
      NextRoutePointLongtitude:'',


      test1: 'null', //调试用四个变量
      test2: 'null',
      test3: 'null',
      test4:'min',
      testlog: [1, 2, 3, 4],
      testinput1:'testinput1',
      testinput2:'testinput2',


      NowLocation: '当前位置', //文本框中内容
      Togo: '我想去',

      mode: 'null', //用于传递搜索模式（现在位置/将要去）

      Searchlocation: '', //搜索页面子传父用

      findpath: false, //是否建立导航路线（暂未使用）

      zoom: 18, //地图缩放比

      monted: false, //地图是否构建完成，防止重复构建
      searched: false, //是否由搜索页返回（暂时弃用）

      logs: [],//地图回调信息

      temp: '',//万用

      RouteGuide: [],//导航用路径点 折线数组
      RouteCount:0,

      UserPosition: '',//用户位置 海量点数组
      UsersChange: false, //是否有用户位置更新
      //司机位置 海量点数组
      DriversPosition:   [      
        {  
          latitude: 23.0526 ,
          longitude:113.3955 ,
        }],
      DriversPosition2:[],
      DriversChange: false, //是否有司机位置更新
      box: 0
    }
  }

  //实现的功能：给出某一个点的经纬度和某一条道路的
  // 起止经纬度，计算出点到道路上的垂直距离，
  // 如果垂足不在道路上，则返回点与道路起止点的最小距离

  /**
   * Created by yyk .
   */

  PointToLine(startlat, startlng, endlat, endlng, poilat, poilng)
   {
    // var DEF_PI = 3.14159265359;
    //点到直线的垂足
    var Point = [poilng,poilat] //所求点
    var R = 6371
    var StrLonLat = [startlng, startlat]//StrLonLat EndLonLat表示直线的起止经纬度
    var EndLonLat = [endlng, endlat]
    var Pedal = this.pointtoline(Point, StrLonLat, EndLonLat) //Pedal表示垂足的经纬
    var PtoP = this.EDistance(Point, Pedal, R)//计算考虑了地球的弧度问题
    var PtoStr = this.EDistance(Point, StrLonLat, R)
    var PtoEnd = this.EDistance(Point, EndLonLat, R)
    var min = this.MIN(PtoP, PtoStr, PtoEnd)//要求的值
    return min
  }


  EDistance(LonLat1, LonLat2, R) {
    //将两点经纬度转换为三维直角坐标
    var DEF_PI = 3.14159265359
    var x1 = Math.cos(this.getRad(LonLat1[0]*1))
    var y1 = Math.sin(this.getRad(LonLat1[0]*1))
    var z1 = Math.tan(this.getRad(LonLat1[1]*1))
    var x2 = Math.cos(this.getRad(LonLat2[0]*1))
    var y2 = Math.sin(this.getRad(LonLat2[0]*1))
    var z2 = Math.tan(this.getRad(LonLat2[1]*1))
    //根据直角坐标求两点间的直线距离（即弦长）
    var L = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2))
    //根据弦长求两点间的距离（即弧长）
    var Eudis = 2 * this.getRad(Math.asin(0.5 * L / R))
    return Eudis;
  }

  pointtoline(point, strlonlat, endlonlat) {
    var A = endlonlat[1] - strlonlat[1]
    var B = strlonlat[0] - endlonlat[0]
    var C = strlonlat[1] * endlonlat[0] - strlonlat[0] * endlonlat[1];
    var Pedal = []
    Pedal[0] = (point[0] * B * B - point[1] * A * B - A * C) / (A * A + B * B)
    Pedal[1] = (point[1] * A * A - A * B * point[0] - B * C) / (A * A + B * B)
    // alert("垂足经度:"+Pedal[0]+"垂足纬度:"+Pedal[1]);
    return Pedal;
  }
  MIN(pp, ps, pe) {
    var mindis;
    if (pp < ps && pp < pe)
      mindis = pp;
    else if (ps < pe)
      mindis = ps;
    else
      mindis = pe;

    return mindis;
  }


  getRad(d) {
    return d * 3.1415926 / 180.0;
  }
  //使用的数学计算方法，计算两个坐标的直线距离
  getGreatCircleDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = this.getRad(lat1)
    var radLat2 = this.getRad(lat2);

    var a = radLat1 - radLat2;
    var b = this.getRad(lng1) - this.getRad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0;
    s = Math.round(s * 10000) / 10000.0;
    return s;
  }

  //将回调经纬度打包为所需格式
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

  Getcity()//更新当前位置
  {
    this.GetLongitudeAndLatitude()
      .then((posarr) => {
        const longitude = posarr[0];
        const latitude = posarr[1];
        fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location=" + longitude + "," + latitude + "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
          .then(response => response.json())
          .then(json => {
            this.setState({
              city: json.regeocode.formatted_address,
              latitude: latitude,
              longitude: longitude
            })
          }).catch((error) => {
            console.log('request failed', error)
          })
      })
  }

  _GetSearchValue(val) //搜索页面子传父用函数
  {
    this.setState({
      Searchlocation: val
    });
  }

  componentDidMount() {
    this.setState({ counter: this.state.counter + 1 })
    if (!this.state.monted) {
      this.Getcity();
      this.setState({ monted: true })
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

  //地图更新时触发
  _logPressEvent = ({ nativeEvent }) => {
    this._log('onPress', nativeEvent)
    const longitude = nativeEvent.longitude;
    const latitude = nativeEvent.latitude;
    if (nativeEvent.longitude != this.state.Togolongitude && nativeEvent.latitude != this.state.Togolatitude) {
      this.setState({
        Togolongitude: nativeEvent.longitude,
        Togolatitude: nativeEvent.latitude,
      }, () => {
        fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location=" + longitude + "," + latitude + "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
          .then(response => response.json())
          .then(json => {
            this.setState({
              Togo: json.regeocode.formatted_address,
            })
          }).catch((error) => {
            console.log('request failed', error)
          })
      })
    }
    this.CheckMap()
  }

  _logLongPressEvent = ({ nativeEvent }) => this._log('onLongPress', nativeEvent)
  _logLocationEvent = ({ nativeEvent }) => this._log('onLocation', nativeEvent)
  _logStatusChangeCompleteEvent = ({ nativeEvent }) => {
    this._log('onStatusChangeComplete', nativeEvent)
  }

  NowLocationChange = ({ nativeEvent }) => {
    const longitude = nativeEvent.longitude;
    const latitude = nativeEvent.latitude;
    if (this.state.searched == true) this.setState({ test: false }) //暂时弃用搜索标记
    else if (nativeEvent.longitude != this.state.Nowlongitude || nativeEvent.Nowlatitude != this.state.latitude) {
      this.setState({
        Nowlongitude: nativeEvent.longitude,
        Nowlatitude: nativeEvent.latitude,
      }, () => {
        fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location=" + longitude + "," + latitude + "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
          .then(response => response.json())
          .then(json => {
            this.setState({
              city: json.regeocode.formatted_address,
              NowLocation: json.regeocode.formatted_address,
            })
          }).catch((error) => {
            console.log('request failed', error)
          })
      })
    }
    this.CheckMap()
  }

  _renderItem = ({ item }) =>
    <Text style={styles.logText}>{item.time} {item.event}: {item.data}</Text>

  Search()//前往搜索页
  {
    this.props.navigation.navigate('Search');
  }

  SearchCallBack(mode, Searchlocation) {
    if (Searchlocation) {
      const arr = Searchlocation.split(',')
      this.setState({
        Searchlocation: Searchlocation,
        longitude: arr[0],
        latitude: arr[1],
        monted: true,
        mode: mode,
        searched: true,
      }, () => {
        fetch("https://restapi.amap.com/v3/geocode/regeo?key=4df0ef52b83b532834ffa118afa77de5&location=" + Searchlocation + "&poitype=城市&radius=1000&extensions=all&batch=false&roadlevel=0")
          .then(response => response.json())
          .then(json => {
            if (mode == 'Now') {
              this.setState({
                NowLocation: json.regeocode.formatted_address,
                Nowlongitude: arr[0],
                Nowlatitude: arr[1],
              })
            }
            else if (mode == 'To') {
              this.setState({
                Togo: json.regeocode.formatted_address,
                Togolongitude: arr[0],
                Togolatitude: arr[1],
              })
            }
          }
          ).catch((error) => {
            console.log('request failed', error)
          })
      });
    }
    this.CheckMap()
  }

  CheckMap()//检查zoom是否合适
  {
    // if(this.state.Nowlatitude&&this.state.Togolatitude)
    // {
    //   this.setState({findpath:true})
    //   var distance=this.getGreatCircleDistance(this.state.Nowlatitude,this.state.Nowlongitude,this.state.Togolatitude,this.state.Togolongitude)
    //   this.setState({test:distance,zoom:3})
    //   if(distance<=500) { this.mapView.animateTo({zoomLevel:18})}
    //   else if(distance<=1000) {this.mapView.animateTo({zoomLevel:15})}
    //   else if(distance<=10000) {this.mapView.animateTo({zoomLevel:10})}
    //   else if(distance<=100000) {this.mapView.animateTo({zoomLevel:8})}
    //   else if(distance<=1000000) {this.mapView.animateTo({zoomLevel:7})}
    //   else if(distance<=1000000) {this.mapView.animateTo({zoomLevel:4})}
    //   else this.mapView.animateTo({zoomLevel:4})
    // }
  }

  Postdata(e)//向搜索页面提供数据
  {
    if (e == 'Now') {
      this.props.navigation.navigate('Search', { Mode: 'Now', Data: this.state.NowLocation, callback: (mode, Searchlocation) => { this.SearchCallBack(mode, Searchlocation) } })
    }
    if (e == 'To') {
      this.props.navigation.navigate('Search', { Mode: 'To', Data: this.state.Togo, callback: (mode, Searchlocation) => { this.SearchCallBack(mode, Searchlocation) } })
    }
  }

  OrderPost() {
    const { username, Nowlatitude, Nowlongitude, Togolatitude, Togolongitude, RouteGuide } = this.state
    var data = {
      DriverID: 6054,
      PassengerID: 1569,
      Fare: 15,
      StartPlace: { Nowlatitude, Nowlongitude },
      destination: { Togolatitude, Togolongitude },
      Route: RouteGuide,
    }
    fetch("https://www.kingdom174.work/register", { method: 'POST', body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
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

  Route(Fromlatitude,Fromlongitide,Tolatitude,Tolongitude)//得到导航路径点
  {
    if (this.state.Nowlatitude && this.state.Togolatitude) 
    {
      this._routeline = []
      var route_length = 0
      //此处使用驾车导航api，还有步行公交骑行等
      fetch("https://restapi.amap.com/v3/direction/driving?key=4df0ef52b83b532834ffa118afa77de5&origin=" + Fromlongitide + "," + Fromlatitude + "&destination=" + Tolongitude + "," + Tolatitude + "&originid=&destinationid=&extensions=base&strategy=0&waypoints=&avoidpolygons=&avoidroad=")
        .then(response => response.json())
        .then(json => {
          for (var a = 0; a < json.route.paths[0].steps.length; a++) {
            this.setState({ temp: json.route.paths[0].steps[a].polyline })//此处默认选择推荐路线，可优化
            const def = String(this.state.temp).split(';') //将原始数据按分号隔开，每组为latitude，longitude
            for (var i = 0; i < def.length; i++) //循环写入值
            {
              if (!this._routeline[route_length]) { this._routeline[route_length] = {} }
              const temp = String(def[i]).split(",") //再次分割，0为latitude,1为longitude
              this._routeline[route_length].latitude = temp[1] * 1
              this._routeline[route_length].longitude = temp[0] * 1
              route_length++
              this.setState({ test3: def.length })//用于确认temp确实读到值了
            }
            //测试用数组
            // const a=[
            //   {
            //     latitude: 23.0630,
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
          }
          this.setState({ RouteGuide: this._routeline,PreRoutePointLatitude:this._routeline[0].latitude,PreRoutePointLongtitude:this._routeline[0].longitude,
            NextRoutePointLatitude:this._routeline[1].latitude,NextRoutePointLongtitude:this._routeline[1].longitude,RouteCount:0,test3: route_length })
        }
        ).catch((error) => {
          console.log('request failed', error)
        })

    }
  }

  //司机路径模拟
  DriverRoute() {
    if (this.state.Nowlatitude && this.state.Driverlongitude) {
      this._routeline = []
      var route_length = 0
      //此处使用驾车导航api，还有步行公交骑行等
      fetch("https://restapi.amap.com/v3/direction/driving?key=4df0ef52b83b532834ffa118afa77de5&origin=" + this.state.Driverlongitude + "," + this.state.Driverlatitude + "&destination=" + this.state.Nowlongitude + "," + this.state.Nowlatitude + "&originid=&destinationid=&extensions=base&strategy=0&waypoints=&avoidpolygons=&avoidroad=")
        .then(response => response.json())
        .then(json => {
          for (var a = 0; a < json.route.paths[0].steps.length; a++) {
            this.setState({ temp: json.route.paths[0].steps[a].polyline })//此处默认选择推荐路线，可优化
            const def = String(this.state.temp).split(';') //将原始数据按分号隔开，每组为latitude，longitude
            for (var i = 0; i < def.length; i++) //循环写入值
            {
              if (!this._routeline[route_length]) { this._routeline[route_length] = {} }
              const temp = String(def[i]).split(",") //再次分割，0为latitude,1为longitude
              this._routeline[route_length].latitude = temp[1] * 1
              this._routeline[route_length].longitude = temp[0] * 1
              route_length++
              convert - webside
              this.setState({ test3: def.length })//用于确认temp确实读到值了
            }
          }
          this.setState({ RouteGuide: this._routeline,PreRoutePointLatitude:this._routeline[0].latitude,PreRoutePointLongtitude:this._routeline[0].longitude,
            NextRoutePointLatitude:this._routeline[1].latitude,NextRoutePointLongtitude:this._routeline[1].longitude,RouteCount:0,test3: route_length })
        }
        ).catch((error) => {
          console.log('request failed', error)
        })
      this.state.RouteGuide.reverse()
    }
  }

  RefreshUserPosition(data) //更新用户位置的函数 data 为 object 包涵 latitude longititude 两个
  {
    this.setState({ latitude: data.latitude, longitude: data.longitude })
  }

  _DriverPoint = []

  RefreshDriverPosition = (data) =>     //更新司机位置的函数 data 为 object 包涵 latitude longititude 两个（单个司机版本）
  {
    const longitude = data.longitude;
    const latitude = data.latitude;
    this.setState({
      Driverlongitude: longitude,
      Driverlatitude: latitude,
    })
  }

  RefreshDriverPosition2(data) //更新司机位置的函数 data 为 object 包涵 key latitude longititude 三个 (多个司机版本)
  {
    //[检查数据是否合法]
    this._DriverPoint = []
    this._DriverPoint = this.state.DriversPosition.concat()
    var length = this._DriverPoint.length
    for (var n = 0; n < length; n++) {
      if (data.key == this._DriverPoint[n].key) {
        this._DriverPoint[n] = {}
        this._DriverPoint[n].key = data.key
        this._DriverPoint[n].latitude = data.latitude
        this._DriverPoint[n].longitude = data.longitude
        this.setState({ DriversPosition: this._DriverPoint, test3: 'ed' })
        alert(this._DriverPoint[n].latitude)
        return
      }
    }
    this._DriverPoint[length] = {}
    // if(Object.isFrozen(this._DriverPoint[length]))
    //  alert('已被冻结') 
    alert('新建,' + length)
    this._DriverPoint[length].key = data.key
    this._DriverPoint[length].latitude = data.latitude
    this._DriverPoint[length].longitude = data.longitude
    this.Russiar[length]
    this.setState({ DriversPosition: this._DriverPoint, test3: 'new' })

  }

  //点击司机对应点时弹出消息
  _DriversonItemPress = point => Alert.alert(this.state.DriversPosition[this.state.DriversPosition.indexOf(point)].key.toString())

  _number = 1

  PointAnimatedTo(Point, Route)  //点的移动函数 一次到位演示版
  {
    var route = Route
    var temp = { latitude: 0, longitude: 0 }
    var n = 0
    var dis = route[0]
    if (Point == "driver") {
      var length = route.length
      var interval = setInterval(() => {
        let coord = route[n++]
        let distance = this.getGreatCircleDistance(dis.latitude, dis.longitude, coord.latitude, coord.longitude)
        while (distance > 30) //处理直到两个点距离小于30m
        {
          temp = dis
          temp.latitude = (dis.latitude + coord.latitude) / 2
          temp.longitude = (dis.latitude + coord.latitude) / 2
          distance = this.getGreatCircleDistance(coord.latitude, coord.longitude, temp.latitude, temp.longitude)
          while (distance > 30) 
          {
            temp.latitude = (temp.latitude + coord.latitude) / 2
            coord.longitude = (temp.latitude + coord.latitude) / 2
            distance = this.getGreatCircleDistance(coord.latitude, coord.longitude, temp.latitude, temp.longitude)
          }
          if (distance <= 30)
           {
            this.RefreshDriverPosition(temp)
            this.mapView.animateTo({
              coordinate: temp,
            })
            coord = temp
            distance = getGreatCircleDistance(coord.latitude, coord.longitude, dis.latitude, dis.longitude)
          }
        }
        this.RefreshDriverPosition(coord)
        this.mapView.animateTo({
          coordinate: coord,
        })
        dis = route[n]
        if (n == length) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  FlatPointToLine(startlat, startlng, endlat, endlng, poilat, poilng)
  {     
    var a,b,c;  
    a=this.getGreatCircleDistance(startlat,startlng,endlat,endlng);//经纬坐标系中求两点的距离公式
    b=this.getGreatCircleDistance(endlat,endlng,poilat,poilng);//经纬坐标系中求两点的距离公式
    c=this.getGreatCircleDistance(startlat,startlng,poilat,poilng);//经纬坐标系中求两点的距离公式
    if(b*b>=c*c+a*a)return c;   
    if(c*c>=b*b+a*a)return b;  
    var l=(a+b+c)/2;     //周长的一半   
    var s=Math.sqrt(l*(l-a)*(l-b)*(l-c));  //海伦公式求面积 
    return 2*s/a;   
  }

  _MoveFlag=false
  DriverMove(DriverNewPos)  //点的移动函数 正式版 参数为{longitude: ,latitude: }
  {
    if(this._MoveFlag)
     {
       alert("等待")
       return 0
      }
    this._MoveFlag=true
    var route = this.state.RouteGuide
    var count = this.state.RouteCount
    var PrePoint= {latitude:this.state.PreRoutePointLatitude,longitude:this.state.PreRoutePointLongtitude}
    var NextPoint = {latitude:this.state.NextRoutePointLatitude,longitude:this.state.NextRoutePointLongtitude}
    var DriverPos={latitude:this.state.Driverlatitude,longitude:this.state.Driverlongitude}
    var temp = { latitude: 0, longitude: 0 }
    this.setState({DriversPosition2:DriverNewPos,...this.state.DriversPosition2})
    //先判断新位置是否脱离路线
    var min= this.FlatPointToLine(PrePoint.latitude,PrePoint.longitude,NextPoint.latitude,NextPoint.longitude,DriverNewPos.latitude,DriverNewPos.longitude)
    this.setState({test4:min})
    if(min<50) //未脱离则单次移动动画，并计算新位置到两个点的距离，如果里离下一个点的距离小于离上一个点的距离
    {
       //如果单次移动距离大于三十米处理直到两个点距离小于30m，暂时取消
       alert("loop1")
      this.RefreshDriverPosition(DriverNewPos)
      this.mapView.animateTo({coordinate:DriverNewPos})
      this.setState({Driverlatitude:DriverNewPos.latitude,Driverlongitude:DriverNewPos.longitude})
      let dis1=this.getGreatCircleDistance(PrePoint.latitude,PrePoint.longitude,DriverNewPos.latitude,DriverNewPos.longitude)
      let dis2=this.getGreatCircleDistance(NextPoint.latitude,NextPoint.longitude,DriverNewPos.latitude,DriverNewPos.longitude)
      if (dis2<dis1)
      {
        PrePoint = NextPoint
        NextPoint = route[count++]
        if(count==route.length)
        {
          alert('行程结束')
        }
        this.setState({RouteCount:count,PreRoutePointLatitude:PrePoint.latitude,PreRoutePointLongtitude:PrePoint.longitude,
        NextRoutePointLatitude:NextPoint.latitude,NextRoutePointLongtitude:NextPoint.longitude})
        this._MoveFlag=false
        return 1
      }
    } else //脱离则重新计算路线
    {
      alert("loop2")
      this.Route(this.state.Driverlatitude,this.state.Driverlongitude,this.state.Togolatitude,this.state.Togolongitude)
      //需要加一个锁，使得路径更新完成时才能输入新的坐标
      this.RefreshDriverPosition(DriverNewPos)
      this.mapView.animateTo({coordinate:DriverNewPos})
      this.setState({Driverlatitude:DriverNewPos.latitude,Driverlongitude:DriverNewPos.longitude})
      this._MoveFlag=false
      return 0
    }


   
}

  Move()//司机位置更新调试用
  {
    let length = this.state.box
    if (length != this.state.RouteGuide.length) {
      let route = this.state.RouteGuide
      let coord = route[length]
      // alert(coord)
      this.RefreshDriverPosition(coord)
      this.mapView.animateTo({
        coordinate: coord,
      })
      this.setState({ box: this.state.box + 1 })
      return 1
    } else {
      alert("完成")
      return 0
    }
  }

  // CMove()
  // {
  //   var flag =1
  //   var interval = setInterval(()=>{
  //     flag=this.Move();
  //     if(flag==0){    
  //         clearInterval(interval);   
  //     }
  // }, 1000);
  //   }

  _OpenDrawer = () => this.props.navigation.openDrawer()

  _DriverMove=()=>{
    var data={latitude:this.state.testinput1*1,longitude:this.state.testinput2*1}
    this.DriverMove(data)
  }
  // _animatedToZGC = () => {
  //   var data={
  //     latitude: this.state.Driverlatitude*1+0.001 ,
  //     longitude:113.3855 ,
  //   }
  //   this.mapView.animateTo({
  //     // tilt: 45,
  //     // rotation: 90,
  //     zoomLevel: 18,
  //     coordinate: data,
  //   })
  // }
_Routetest=()=>{
  this.Route(this.state.Nowlatitude,this.state.Nowlongitude,this.state.Togolatitude,this.state.Togolongitude)
  // this.setState({min:this.state.Nowlatitude,test4:this.state.Nowlongitude})
}
  componentWillMount() {

  }

  _points = Array(1000).fill(0).map(() => ({
    key: '王老五',
    latitude: 22.0526 + Math.random(),
    longitude: 112.3755 + Math.random(),
  }))

  render() {
    var Pos = {
      Mainpos: {
        latitude: this.state.latitude * 1,
        longitude: this.state.longitude * 1
      },
      Nowpos: {
        latitude: this.state.Nowlatitude * 1,
        longitude: this.state.Nowlongitude * 1
      },
      Togopos: {
        latitude: this.state.Togolatitude * 1,
        longitude: this.state.Togolongitude * 1
      },
      DriverPos: {
        latitude: this.state.Driverlatitude * 1,
        longitude: this.state.Driverlongitude * 1
      }

    }

    if (this.DriversChange == true)
      this.RefreshDriverPosition()
    const { navigation } = this.props;
    const mode = navigation.getParam('Mode', null);
    const Searchlocation = navigation.getParam('Searchlocation', null)
    let driverPos = Pos.DriverPos
    //！！！严重错误，不要在render里setstate,会导致无限重构
    return (

      <View style={styles.container}>
        <TouchableOpacity style={{ zIndex: 2, position: 'absolute', top: 10, left: 10 }} activeOpacity={0.2} onPress={this._OpenDrawer}>
          <Image style={{ width: 30, height: 30 }} source={require('../images/account_icon.png')} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ zIndex: 2, position: 'absolute', top: 50, left: 50 }} onPress={this._animatedToZGC}>
          <Text style={styles.text}>跳转测试</Text>
        </TouchableOpacity> */}
        <MapView
          coordinate={Pos.Mainpos}
          zoomLevel={this.state.zoom}
          ref={ref => this.mapView = ref}
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
          <MapView.Marker image="default" coordinate={driverPos}>
            <View style={styles.defaultbox}>
              <Text>司机位置</Text>
            </View>
          </MapView.Marker>
          <MapView.Polyline
            width={5}
            color="rgba(255, 0, 0, 0.5)"
            coordinates={this.state.RouteGuide}
          />
          {/* {this.state.DriversPosition.map((item)=>{
            return <DriversPos coords={item}/>
          })} */}
          <MapView.MultiPoint
            image="point"
            points={this.state.DriversPosition}
            onItemPress={this._DriversonItemPress}
          />
        </MapView>
        <View style={styles.middle}>
          <Text style={styles.textInputStyle}>{this.state.Togolatitude},{this.state.Togolongitude},{this.state.RouteGuide.length},{this.state.Driverlatitude},{this.state.Driverlongitude}</Text>
          {/* <Text style={styles.input}>测试:{this.state.test2},{this.state.test1}+{this.state.test3}</Text> */}
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{flex:1,alignContent:'center',flexDirection: 'row',}}>
            <TextInput style={styles.textInputStyle2} onChangeText={(input) => {this.setState({testinput1:input}) }} value={this.state.testinput1} placeholder={'latitude'}></TextInput>
            <TextInput style={styles.textInputStyle2} onChangeText={(input) => {this.setState({testinput2:input}) }} value={this.state.testinput2} placeholder={'longitude'}></TextInput>
          </View>
            <Text style={styles.textInputStyle} onPress={(event) => this.Postdata('Now')} key='Now'>{this.state.NowLocation}</Text>
            <Text style={styles.textInputStyle} onPress={(event) => this.Postdata('To')} key='To'>{this.state.Togo}</Text>
            <Button style={styles.login} onPress={this._DriverMove} title="DriverMove" />
            {/* <Button style={styles.login} onPress={() => this.PointAnimatedTo("driver", this.state.RouteGuide)} title="Move" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          {/* <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}} onPress={() => this.props.navigation.navigate('Mine')} title="我的课程"/> */}
          {/* <Button style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between' }} onPress={() => this.props.navigation.openDrawer()} title="左侧抽屉"/> */}
          <Button style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', }} onPress={this._Routetest} title="路径测试" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20
    },
    top: {
      flex: 6
    }
    ,
    middle: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      margin: 10
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end'
    }
    , item: {
      flex: 1,
      fontSize: 30,
      width: 500,
    },
    input: {
      fontSize: 20,
      marginTop: 20,
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
      backgroundColor: 'orange',
      width: 150,
      height: 50,
      lineHeight: 50,   
      textAlign: 'center',
    },
    textInputStyle: {
      height: 38,
      width: screenWidth-40,
      backgroundColor: 'white',
      marginBottom: 1,
      textAlign: 'center'
    },
    textInputStyle2: {
      height: 38,
      width: 200,
      backgroundColor: 'white',
      marginBottom: 1,
      textAlign: 'center'
    },
    defaultbox: {
      width: 90,
      backgroundColor: "pink",
      margin: 20,
    },
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
    buttons: {
      width: Dimensions.get('window').width,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      margin: 10,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      fontSize: 16,
    },
  }
);