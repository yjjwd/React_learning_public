import  React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet } from 'react-native';

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
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Mine Screen</Text>
        </View>
      );
    }
  }
