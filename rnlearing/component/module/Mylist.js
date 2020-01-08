import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default class Mylist extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          ...this.props.data
        }
      }
  
      render() {
        if (this.state.movies) {
          return this.renderLoadingView()
        } else 
      return (
          <View style={styles.container}>
            <View style={styles.course}>
              <Text style={styles.title}>{this.state.name}</Text>
              <View style={styles.introduction}>
                  <Text>{this.state.address}</Text>
              </View>
            </View>
          </View>
        );
      }
      renderLoadingView() {
        return (
          <View style={styles.container}>
            <Text>
              正在搜索数据……
            </Text>
          </View>
        );
      }
  }

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