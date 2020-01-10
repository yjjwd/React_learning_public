import  React,{Component} from 'react'
import {Text,ScrollView,View,Image,TextInput,StyleSheet,Button ,FlatList,TouchableOpacity} from 'react-native';
import { MapView } from 'react-native-amap3d'
import Mylist from './module/Mylist'



export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
          datastr:'',
          data:[],
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

    Goback(item)
    {
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
        <TextInput style={styles.input} onChangeText={(search) => { this.setState({search:search},this.GetData(search))  }} 
        onSubmitEditing={()=>{}}
        value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
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
      <TextInput style={styles.input} onChangeText={(search) => {this.setState({search:search},this.GetData(search)) }} value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
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