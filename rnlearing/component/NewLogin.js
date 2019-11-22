
import React,{Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';


//屏幕宽度
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
var screenWidth = width;

//创建组件
export default class loginView extends Component{
    render() {
        return (
            <View style={styles.container}>
                {/*头像*/}
                <Image
                source={require('../images/head_icon.png')}
                style={styles.iconStyle}
                ></Image>

                {/*账号和密码*/}
                <TextInput
                    placeholder={'请输入用户名'}
                    style={styles.textInputStyle}
                ></TextInput>
                <TextInput
                    placeholder={'请输入密码'}
                    password={true}
                    style={styles.textInputStyle}
                ></TextInput>
                {/*登录*/}
                <View style={styles.loginBtnStyle}>
                    <Text style={{color:'white',textAlign:'center'}}>登录</Text>
                </View>
                {/*无法登录和新用户*/}
                <View style={styles.settingStyle}>
                    <Text>无法登录</Text>
                    <Text>新用户</Text>
                </View>
                {/*其他登录方式*/}
                <View style={styles.otherLoginStyle}>
                    <Text style={{justifyContent:'flex-start',width:180}}>其他登录方式</Text>
                    <Image style={styles.otherLoginIcon} source={require('../images/qq_icon.png')}></Image>
                    <Image style={styles.otherLoginIcon} source={require('../images/wechat_icon.png')}></Image>
                    <Image style={styles.otherLoginIcon} source={require('../images/weibo_icon.png')}></Image>
                </View>
            </View>
        );
    }
}

//设置样式
const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'#dddddd',
   //    设置侧轴的对齐方式
       alignItems:'center'
   },
    iconStyle:{
       marginTop:50,
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:2,
        borderColor:'white',
        marginBottom:30
    },
    textInputStyle:{
        height:38,
        width:screenWidth,
        backgroundColor:'white',
        marginBottom:1,
    //    内容居中
        textAlign:'center'
    },
    //登录按钮
    loginBtnStyle:{
        height:44,
        width:screenWidth * 0.9,
        backgroundColor:'green',
        marginTop:30,
    //    设置侧轴对齐方式
        justifyContent:'center',
        alignItems:'center',
    //    设置圆角
        borderRadius:5
    },
    //无法登录和新用户样式
    settingStyle:{
    //    设置主轴方向
        flexDirection:'row',
    //    设置宽度
        width:screenWidth * 0.9,
        height:44,
        alignItems:'center',
    //    设置主轴的对齐方式为两端对齐
        justifyContent:'space-between'
    },
    // 其他登录方式
    otherLoginStyle:{
    //    设置主轴的方向
        flexDirection:'row',
    //    设置侧轴的对齐方式
        alignItems:'center',
    //    绝对定位
    //    设置position为absolute(绝对定位)
        position:'absolute',
        bottom:10,
        left:20
    },
    otherLoginIcon:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:10
    }
});


