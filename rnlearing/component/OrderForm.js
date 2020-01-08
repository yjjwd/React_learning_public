import  React,{Component} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'


const testdata={
  process:[{
  name:'订单已下达', 
  title:"2019-11-24\n16:45",
  content:"王师傅已接单",
  isExecuted:true//控制原点和线的颜色
  },{
  name:'司机正在赶来', 
  title:"2019-11-24\n16:51",
  content:"请耐心等候",
  isExecuted:true
  },{
  name:'司机取消了订单', 
  title:"2019-11-24\n16:54",
  content:"换一单吧",
  isExecuted:false
  },{
  name:'订单已受理', 
  title:"2019-11-24\n16:57",
  content:"曹师傅已接单",
  isExecuted:true
  }], 
  simple: 
    {
      name: '语文',
      pic: require('../images/yw.jpeg'),
      target: [
        '帮助孩子掌握常见的基础汉字，通过主题字拓展学习，在识字过程中了解成语和故事。学习小学必背古诗，积累优秀诗文名句，培养古诗鉴赏能力。'
      ],
      plan: [
        '一年级 基础',
        '拼音、初识汉字、标点符号等趣味知识。',
        '二年级 基础',
        '趣味识字、多音字、近反义词、关联词、以词连句夯实基础。',
        '一年级 读写',
        '小学必背古诗词、学会观察、朗读与理解、看图写话。',
        '二年级 读写',
        '提升听说读写综合能力，朗读诗文，初步短篇朗读知识。',
        '一年级 阅读专题',
        '补充古代神话故事等启蒙课程，轻松沉淀国学素养。',
        '二年级 阅读专题',
        '成语普及、姓氏由来、寓言故事等国学知识。'
      ]
    }
  ,

}
export default class OrderFormScreen extends React.Component{
  constructor(props) {
    super(props);
    
}
componentWillReceiveProps(nextProps){
  this.setState({data:nextProps.data});
}

  render(){
    return(
  <View style={styles.container}>
    <View style={styles.simpleitem}>
      <OrderFormProess data={testdata.process}/>
    </View>
    {/* <View style={{flex:1}}>
      <OrderFormProess data={testdata.process}/>
    </View> */}
   
  </View>
);
}
}

export class OrderFormSimple extends Component{
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.data
    }
  }
  render(){
    return(
      <View style={styles.container}>
      <View style={styles.course}>
        <Text style={styles.title}>{this.state.name}</Text>
        <View style={styles.introduction}>
            <Text>{this.state.name}</Text>
        </View>
      </View>
    </View>
    )
  }
}

export class OrderFormProess extends Component{
  state={
      data:this.props.data || []
  }
  componentWillReceiveProps(nextProps){
     this.setState({data:nextProps.data});
  }

  render(){
      let data = this.state.data;
      return(
          <View style={styles.box}>
             {
                (data && data.length) && 
                  data.map((item,index)=>{
                      let {name,title,content,isExecuted} = item;
                      let isLast = (index+1>=data.length);
                      let nextExecuted = !isLast?data[index+1].isExecuted:true;
                      return(
                           <View key={index} style={[styles.item,{minHeight:(isLast?0:120)}]}>
                                <View style={[styles.itemLeft]}>
                                     {
                                          (typeof(name)==="string" || typeof(name)==="number")?
                                          <Text style={[styles.text,{textAlign:"right"}]}>{name}</Text>:
                                          <View>{name}</View>
                                      }
                                </View>
                                <View style={styles.itemCenter}>
                                     <View style={[styles.itemSign,{backgroundColor:(isExecuted?"#d24507":"#cecece")}]} />
                                    {
                                      !isLast && <View style={[styles.itemline,
                                      {borderLeftColor:((isExecuted && nextExecuted)?"#d24507":"#cecece")}]} />
                                    }
                                </View>
                                <View style={[styles.itemRight]}>
                                      {
                                          (typeof(title)==="string" || typeof(title)==="number")?
                                          <Text style={[styles.text,styles.titleText]}>{title}</Text>:
                                          <View>{title}</View>
                                      }
                                      {
                                           (typeof(content)==="string" || typeof(content)==="number")?
                                           <Text>{content}</Text>:
                                           <View>{content}</View>
                                      }
                                </View>
                           </View>
                      );
                  })
             }  
          </View>
      );
  }
}

const styles =StyleSheet.create({
  box:{
    backgroundColor:"white",
    padding:20
 },      
 item:{
  width:"100%",
  minHeight:200,
  flexDirection:"row",
},
text:{
  minHeight:20,
  justifyContent:"center",
},

itemLeft:{
  width:100,
  alignItems:"flex-end"
},
itemCenter:{
  alignItems:"center",
  marginHorizontal:10
},
itemSign:{
  width:20,
  height:20,
  borderRadius:20,
  backgroundColor:"#fb4f04",
},
itemline:{
  flex:1,
  
  borderLeftColor:"green",
  borderLeftWidth:1,
  borderStyle: 'dotted',
},
itemRight:{
   flex:1,
},
titleText:{
   fontSize:16,
   color:"#313131"
},   img: {
  width: 100,
  height: 100
},
course: {
  marginLeft: 20
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black'
},
introduction: {
  width: 260,
  fontSize: 14,
  lineHeight: 21,
  textAlign: 'justify',
  marginTop: 5
},
simpleitem:{
  height:180,
},
simplebox:{
  borderWidth:1,
}

})