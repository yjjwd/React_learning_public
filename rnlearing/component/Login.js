import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet,FlatList,Botton } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'

export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            token:'',
            logs:[],
        }
    }
    componentDidMount(){}
     LocalLogin(){
            const{username,password}=this.state
            if(username===password&&username==='admin')
            {
                alert('登陆成功')
                this.props.navigation.navigate('MainMenu')
            }else{
                alert('账号或密码错误')
            }
    }
    Register(){
        
        const{username,password}=this.state
        // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
        // .then(response => response.json()) // parses response to JSON
        fetch("https://www.kingdom174.work/register?sex=register&r_username="+username+"&r_password="+password,{method:'GET'})   
    }
    Login(){
        
        const{username,password}=this.state
        // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
        // .then(response => response.json()) // parses response to JSON
        fetch("https://www.kingdom174.work/Login?username="+username+"&password="+password+"&location=",{method:'GET'})   
        .then(response=>response.text())
        .then(string=>{
            this.setState({token:string})
            alert(string)
        })
    }

    UserMessage()
    {
        const{token}=this.state
        fetch("https://www.kingdom174.work/Per_Information?token="+token)
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                logs: [
                  {
                    UserName: json.UserName,
                    Sex:json.Sex,
                    Status:json.Status,
                    PhoneNumber:json.PhoneNumber,
                  },
                  ...this.state.logs,
                ],
              })
        })
    }


    _renderItem = ({ item }) =>
  <Text style={styles.logText}>{item. UserName} {item. Sex}: {item.Status}</Text>

    render(){
        return(
            <View style ={styles.container}>
                <Text style={styles.title}>登陆</Text>
                <TextInput style={styles.input} 
                onChangeText={(username)=>this.setState({username})}
                value={this.state.username}
                placeholder={'请输入用户名(admin)'}/>
                <TextInput style={styles.input} 
                onChangeText={(password)=>this.setState({password})}
                value={this.state.password}
                placeholder={'请输入密码(admin)'}/>
                 <TextInput style={styles.input} 
                onChangeText={(token)=>this.setState({token})}
                value={this.state.token}
                placeholder={'token'}/>
                <Text style={styles.login} onPress={()=>{this.Login()}}>Login</Text>
                <Text style={styles.login} onPress={()=>{this.Register()}}>Register</Text>
                <Text style={styles.login} onPress={()=>{this.UserMessage()}}>Message</Text>
                <Text style={styles.login} onPress={() => this.props.navigation.navigate('Home')}>ToHome</Text>
                <FlatList style={styles.logs} data={this.state.logs} renderItem={this._renderItem}
	        />
            </View>
        );
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
            margin: 10,
            backgroundColor: 'orange',
            width: 150,
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
   
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
