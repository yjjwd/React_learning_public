import { MapView } from 'react-native-amap3d'
import  React,{Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet,TouchableOpacity,Button,FlatList,Alert} from 'react-native';


export default class DriversPos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...this.props.coords
          }
    }

render(){

      return(
            this.state.data.map((item) => {
              return (
                  <MapView.Marker image="flag" coordinate={{latitude:item.latitude,longititude:item.longititude}}>
                        <View style={styles.defaultbox}>
                            <Text>{item.key}</Text>
                        </View>
                 </MapView.Marker> 
              )
            })
      )
  }
};
