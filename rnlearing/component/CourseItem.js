import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default class CourseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.course
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={this.state.pic} resizeMode={'contain'} />
        <View style={styles.course}>
          <Text style={styles.title}>{this.state.name}</Text>
          <View style={styles.introduction}>
            {
              this.state.target.map((item) => {
                return (<Text>{item}</Text>)
              })
            }
          </View>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    height: 100
  },
  img: {
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
  item: {
    height: 180
  }
});
