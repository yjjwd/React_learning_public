import React, {Component} from 'react';
import {StyleSheet, View, Image,TouchableOpacity, Text} from 'react-native';

export default class Back extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.course
    }
  }

  _Back=()=>this.props.navigation.goBack()

  render()
  {
    return(
      <View style={styles.container} >
        <TouchableOpacity activeOpacity={0.2} onPress={this._Back}>
          <Image style={styles.img} source={require('../../images/back_img.png')}></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'white',
    padding: 20,
    height: 100,
    position:'absolute',
    left:10,
    top:10,
  },
  img: {
    width: 20,
    height: 20,
  },
  back:{
    // flexDirection: 'row',
    // backgroundColor: 'white',
    width: 20,
    height: 20,
    position:'absolute',
    left:10,
    top:10,
  },
  backimg:{
    width: 20,
    height: 20,
  }
 
});
