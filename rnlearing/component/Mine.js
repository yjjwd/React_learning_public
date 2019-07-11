import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet,Button } from 'react-native';

// export default class MineScreen extends Component{
//     constructor(props){
//         super(props)
//         this.state={

//         }
//     }
//     componentDidMount(){}

//     render(){
//         return(
//             <View style ={styles.container}>
//               <Text style={styles.titl}>个人页面</Text>
//             </View>
//         );
//     }
// }

export default class MineScreen extends React.Component {
  static navigationOptions = {
    title: '我的课程',
  };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Teacher Screen</Text>
          {/* <Button
            title="Teacher->Mine"
            onPress={() => this.props.navigation.navigate('Mine')}
          /> */}
        </View>
      );
    }
  }
