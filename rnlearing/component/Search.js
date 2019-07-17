import  React,{Component} from 'react'
import {Text,ScrollView,View,Image,TextInput,StyleSheet,Button ,FlatList,TouchableOpacity} from 'react-native';
import { MapView } from 'react-native-amap3d'
import Mylist from './Mylist'



export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
          datastr:'',
          data:
     [{"id":[],"name":"肯德基","district":[],"adcode":[],"location":[],"address":[],"typecode":[],"city":[]},{"id":"B0FFKEPXS2","name":"肯德基(望京西店)","district":"北京市朝阳区","adcode":"110105","location":"116.474027,39.997731","address":"望京西园4区410号综合楼1层","typecode":"050301","city":[]},{"id":"B000A7BM4H","name":"肯德基(花家地店)","district":"北京市朝阳区","adcode":"110105","location":"116.469209,39.985562","address":"花家地小区1号商业楼","typecode":"050301","city":[]},{"id":"B000A7FVJQ","name":"肯德基(中福百货店)","district":"北京市朝阳区","adcode":"110105","location":"116.463373,40.000423","address":"望京南湖东园201号楼1层","typecode":"050301","city":[]},{"id":"B000A875MK","name":"肯德基(来广营店)","district":"北京市朝阳区","adcode":"110105","location":"116.464422,40.016510","address":"香宾路66-1号","typecode":"050301","city":[]},{"id":"B000A80GPM","name":"肯德基(酒仙桥二店)","district":"北京市朝阳区","adcode":"110105","location":"116.495399,39.961907","address":"酒仙桥路39号久隆百货B1层","typecode":"050301","city":[]},{"id":"B000A9P8KT","name":"肯德基(太阳宫店)","district":"北京市朝阳区","adcode":"110105","location":"116.448473,39.971184","address":"太阳宫中路12号凯德MallF1层01-13A-14-15B","typecode":"050301","city":[]},{"id":"B000A80HAN","name":"肯德基(霄云路店)","district":"北京市朝阳区","adcode":"110105","location":"116.464837,39.959331","address":"霄云路27号中国庆安大厦1层","typecode":"050301","city":[]},{"id":"B0FFF3DEDV","name":"肯德基(凤凰汇购物中心)","district":"北京市朝阳区","adcode":"110105","location":"116.456296,39.962578","address":"曙光西里甲5号院24号楼凤凰汇购物中心B1层104号","typecode":"050301","city":[]},{"id":"B000A8ZIKF","name":"肯德基(西坝河店)","district":"北京市朝阳区","adcode":"110105","location":"116.436279,39.968924","address":"西坝河西里","typecode":"050301","city":[]}],
          load:false
          
        }
    }
    // [{"id":[],"name":"肯德基","district":[],"adcode":[],"location":[],"address":[],"typecode":[],"city":[]},{"id":"B0FFKEPXS2","name":"肯德基(望京西店)","district":"北京市朝阳区","adcode":"110105","location":"116.474027,39.997731","address":"望京西园4区410号综合楼1层","typecode":"050301","city":[]},{"id":"B000A7BM4H","name":"肯德基(花家地店)","district":"北京市朝阳区","adcode":"110105","location":"116.469209,39.985562","address":"花家地小区1号商业楼","typecode":"050301","city":[]},{"id":"B000A7FVJQ","name":"肯德基(中福百货店)","district":"北京市朝阳区","adcode":"110105","location":"116.463373,40.000423","address":"望京南湖东园201号楼1层","typecode":"050301","city":[]},{"id":"B000A875MK","name":"肯德基(来广营店)","district":"北京市朝阳区","adcode":"110105","location":"116.464422,40.016510","address":"香宾路66-1号","typecode":"050301","city":[]},{"id":"B000A80GPM","name":"肯德基(酒仙桥二店)","district":"北京市朝阳区","adcode":"110105","location":"116.495399,39.961907","address":"酒仙桥路39号久隆百货B1层","typecode":"050301","city":[]},{"id":"B000A9P8KT","name":"肯德基(太阳宫店)","district":"北京市朝阳区","adcode":"110105","location":"116.448473,39.971184","address":"太阳宫中路12号凯德MallF1层01-13A-14-15B","typecode":"050301","city":[]},{"id":"B000A80HAN","name":"肯德基(霄云路店)","district":"北京市朝阳区","adcode":"110105","location":"116.464837,39.959331","address":"霄云路27号中国庆安大厦1层","typecode":"050301","city":[]},{"id":"B0FFF3DEDV","name":"肯德基(凤凰汇购物中心)","district":"北京市朝阳区","adcode":"110105","location":"116.456296,39.962578","address":"曙光西里甲5号院24号楼凤凰汇购物中心B1层104号","typecode":"050301","city":[]},{"id":"B000A8ZIKF","name":"肯德基(西坝河店)","district":"北京市朝阳区","adcode":"110105","location":"116.436279,39.968924","address":"西坝河西里","typecode":"050301","city":[]}]
    GetData()
    {
        fetch("https://restapi.amap.com/v3/assistant/inputtips?key=4df0ef52b83b532834ffa118afa77de5&keywords=肯德基&type=050301&location=116,39&city=广东&datatype=all")
        .then(response=>response.json())
        .then(json=>{
          this.setState({
                 datastr:JSON.stringify(json),
                 data:json.tips,
                 load:true
                })           
        }
      )
    }
    componentWillMount()
    {
        this.GetData()
    }

    // <Text>数据：{this.state.datastr}</Text>
    // <Text>测试：{this.state.data[1].name}</Text>
    
    renderLoadingView() {
      return (
        <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
          <Text style={styles.title}>
            请稍后，正在搜索数据……
          </Text>
        </View>
      );
    }

    render(){
      if(this.state.load)
      {
        return(
            // <View style={{flex:1 ,justifyContent:'center'}}>
            //   <Mylist data={this.state.data}/>
            // </View>
            <ScrollView style={styles.container}>
            {
              this.state.data.map((item) => {
                return (
                  <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('Home', {Searchlocation: item.location}) }} >
                    <Mylist data={item} />
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        )
      }else return this.renderLoadingView() 
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingBottom: 10
  },
  item: {
    height: 80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  });