import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet,Button,TouchableOpacity } from 'react-native';

import CourseItem from './module/CourseItem'
export default class MineScreen extends React.Component {
  static navigationOptions = {
    title: '我的课程',
  };
  constructor(props){
    super(props)
  this.state = {
    courses: [
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
      },
      {
        name: '数学',
        pic: require('../images/sx.jpeg'),
        target: [
          '1、学习更有趣的数学思维；',
          '2、系统训练解题能力；',
          '3、提升数学知识的应用能力。'
        ],
        plan: [
          '第一讲 	逛超市',
          '掌握多位数加减巧算；学习数字谜问题',
          '第二讲 	变形记',
          '通过挪方块深入理解周长；学会巧求周长',
          '第三讲 	忙碌的蚂蚁',
          '初步感受面积和体积；建立一维→二维→三维空间感',
          '第四讲 	古代货币（一）',
          '学习多位数乘一位数（严格竖式写法）；学习竖式谜问题',
          '第五讲 	古代货币（二）',
          '掌握多位数除一位数（严格竖式写法）；掌握竖式谜问题',
          '第六讲 	动物运动会',
          '认识倍；学习应用乘除法；学会统一评比标准，决出胜负',
          '第七讲 	生活在古代',
          '掌握等量代换的方法；了解货币的发展史',
          '第八讲 	马其顿方阵',
          '掌握方阵问题',
          '第九讲 	数学游戏',
          '学习游戏策略和数学逻辑',
          '第十讲 	温故知新',
          '综合考核知识及试题讲评、分析，是阶段学习效果的检测，帮助孩子查漏补缺，有利于后期学习方法的改进'
        ]
      },
      {
        name: '英语',
        pic: require('../images/yy.jpeg'),
        target: [
          '1、积累2000+高频词汇，构建完整语法体系，优化完形阅读解题能力，提高听口写作水平，为初中英语综合运用打牢基础。',
          '2、学习单词、语法、听力、写作、完形多模块同步学习，全面提升英语能力。'
        ],
        plan: [
          '',
          '1、学习关于私人谈话、旅行、人物介绍等话题的6篇课文，掌握约160个高频词汇。',
          '',
          '2、梳理6个新概念二册语法，通过150道以上的练习题，巩固词法，拓展句法，完成冠词、时态、比较级和最高级等语法要点。',
          '',
          '3、阅读15篇课内外精选文章，达到3000词以上的总阅读量，培养每分钟80个词的阅读速度。',
          '',
          '4、精练1篇话题写作，掌握作文审题构思技巧，能就熟悉话题完成80词左右的篇章写作。'
        ]
      }
    ]
  }
}
    render() {
      return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <Text>Mine Screen</Text>
        // </View>
        <View style={styles.container}>
        {
          this.state.courses.map((item) => {
            return (
              <View style={styles.item} >
                <CourseItem course={item} />
              </View>
            )
          })
        }
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingBottom: 10
    },
    item: {
      height: 180
    }
  });
  