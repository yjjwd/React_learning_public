import  React,{Component} from 'react'
import {Text,ScrollView,View,Image,TextInput,StyleSheet,Button ,FlatList,TouchableOpacity} from 'react-native';
import { MapView } from 'react-native-amap3d'
import Mylist from './module/Mylist'



export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
          datastr:'',
          data:
     [{"id":[],"name":"肯德基","district":[],"adcode":[],"location":[],"address":[],"typecode":[],"city":[]},{"id":"B0FFKEPXS2","name":"肯德基(望京西店)","district":"北京市朝阳区","adcode":"110105","location":"116.474027,39.997731","address":"望京西园4区410号综合楼1层","typecode":"050301","city":[]},{"id":"B000A7BM4H","name":"肯德基(花家地店)","district":"北京市朝阳区","adcode":"110105","location":"116.469209,39.985562","address":"花家地小区1号商业楼","typecode":"050301","city":[]},{"id":"B000A7FVJQ","name":"肯德基(中福百货店)","district":"北京市朝阳区","adcode":"110105","location":"116.463373,40.000423","address":"望京南湖东园201号楼1层","typecode":"050301","city":[]},{"id":"B000A875MK","name":"肯德基(来广营店)","district":"北京市朝阳区","adcode":"110105","location":"116.464422,40.016510","address":"香宾路66-1号","typecode":"050301","city":[]},{"id":"B000A80GPM","name":"肯德基(酒仙桥二店)","district":"北京市朝阳区","adcode":"110105","location":"116.495399,39.961907","address":"酒仙桥路39号久隆百货B1层","typecode":"050301","city":[]},{"id":"B000A9P8KT","name":"肯德基(太阳宫店)","district":"北京市朝阳区","adcode":"110105","location":"116.448473,39.971184","address":"太阳宫中路12号凯德MallF1层01-13A-14-15B","typecode":"050301","city":[]},{"id":"B000A80HAN","name":"肯德基(霄云路店)","district":"北京市朝阳区","adcode":"110105","location":"116.464837,39.959331","address":"霄云路27号中国庆安大厦1层","typecode":"050301","city":[]},{"id":"B0FFF3DEDV","name":"肯德基(凤凰汇购物中心)","district":"北京市朝阳区","adcode":"110105","location":"116.456296,39.962578","address":"曙光西里甲5号院24号楼凤凰汇购物中心B1层104号","typecode":"050301","city":[]},{"id":"B000A8ZIKF","name":"肯德基(西坝河店)","district":"北京市朝阳区","adcode":"110105","location":"116.436279,39.968924","address":"西坝河西里","typecode":"050301","city":[]}],
          load:false,
          Mode:'',
          search:''
          
        }
    }

    GetData(data)
    {
        fetch("https://restapi.amap.com/v3/assistant/inputtips?key=4df0ef52b83b532834ffa118afa77de5&keywords="+data+"&type=050000&location=116,39&city=广东&datatype=all")
        .then(response=>response.json())
        .then(json=>{
          this.setState({
                 datastr:JSON.stringify(json),
                 data:json.tips,
                 load:true,
                })           
        }
      )
    }

    Goback(item){
      const {navigate,goBack,state} = this.props.navigation;
      state.params.callback(this.state.Mode,item.location);
      this.props.navigation.navigate('Home', {Mode:this.state.Mode,Searchlocation:item.location})
    }
  
    componentWillMount()
    {
      const { params } = this.props.navigation.state;
      const data = params ? params.Data : null;
      const mode = params ? params.Mode:null;
      this.setState({Mode:mode})
    }

    renderLoadingView() {
      return (
        <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(search) => { this.setState({search:search},this.GetData(search))  }} value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
        <Text>调试用:{this.state.Mode}</Text>
          <Text style={styles.title}>
            请稍后，正在搜索数据……
          </Text>
        </View>
      );
    }
    renderBlank()
    {
      return(
      <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={(search) => { this.setState({search:search},this.GetData(search))  }} value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
      <Text>调试用:{this.state.Mode}</Text>
        <Text style={styles.title}>
        </Text>
      </View>
      )
    }

    render(){
      if(this.state.search=="") return this.renderBlank()
      if(this.state.load)
      {
        return(
            <ScrollView style={styles.container}>
               <TextInput style={styles.input} onChangeText={(search) => { this.setState({search:search},this.GetData(this.state.search))  }} value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
               <Text>调试用:{this.state.load}</Text>
            {
              this.state.data.map((item) => {
                return (
                  <TouchableOpacity style={styles.item} onPress={()=>this.Goback(item)} >
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
  },
  item: {
    height: 80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
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
  });