import React, { Component } from 'react'
import { Text, ScrollView, View, Image, TextInput, StyleSheet, Button, FlatList, TouchableOpacity, Platform } from 'react-native';
import { MapView } from 'react-native-amap3d'
import { NavigationEvents, Header } from 'react-navigation'
import Mylist from './module/Mylist'

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var screenWidth = width;

export default class Search extends React.Component {
  static navigationOptions = {
    title: '搜索',
    headerTitle: (
      <View style={{ width: screenWidth - 110, alignItems: 'center' }}>
        <Text style={{ color: 'rgb(0,0,0)', fontWeight: 'bold', fontSize: 18 }}>搜索</Text>
      </View>
    ),
    headerRight: <View />
  }
  static headerTitleStyle = { alignSelf: 'center' }
  constructor(props) {
    super(props);
    this.state = {
      value: '',

      placeholder: '搜索',
      datastr: '',
      data: [],
      datastr: '',
      load: false,
      Mode: '',
      searchtext: '',
      isPostList: false, //是否搜索
      keyword: '',//搜索关键字
      searchHistory: [],// 搜索历史数组
      hotTagsArr: [],// 热门搜索标签数组
    };

  }

  GetData(data) {
    fetch("https://restapi.amap.com/v3/assistant/inputtips?key=4df0ef52b83b532834ffa118afa77de5&keywords=" + data + "&type=050000&location=116,39&city=广东&datatype=all")
      .then(response => response.json())
      .then(json => {
        this.setState({
          datastr: JSON.stringify(json),
          data: json.tips,
          load: true,
        })
      }
      )
  }

  Goback(item) {
    const { navigate, goBack, state } = this.props.navigation;
    state.params.callback(this.state.Mode, item.location);
    this.props.navigation.navigate('Home', { Mode: this.state.Mode, Searchlocation: item.location })
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const data = params ? params.Data : null;
    const mode = params ? params.Mode : null;
    this.setState({ Mode: mode })
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(search) => { this.setState({ search: search }, this.GetData(search)) }}
          onSubmitEditing={() => { }}
          value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
        <Text>调试用:{this.state.Mode}</Text>
        <Text style={styles.title}>
          请稍后，正在搜索数据……
          </Text>
      </View>
    );
  }
  renderBlank() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(search) => { this.setState({ search: search }, this.GetData(search)) }} value={this.state.search} placeholder={'请输入搜索内容'}></TextInput>
        <Text>调试用:{this.state.Mode}</Text>
        <Text style={styles.title}>
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={sty.container}>
        <NavigationEvents onWillFocus={() => { }} />
        <View style={sty.inputBox}>
          <View style={sty.inputIcon}>
            <Image style={{ height: 15, width: 15 }} source={require('../images/search_icon.png')} />
          </View>
          <TextInput style={sty.inputText}
            autoCapitalize="none"
            value={this.state.searchtext}
            onChangeText={(searchtext) => this.setState({ searchtext: searchtext })}
            onSubmitEditing={() => {
              this.GetData(this.state.searchtext)
            }}
            returnKeyType="search"
            underlineColorAndroid="transparent"
            placeholder={this.state.placeholder}
            placeholderTextColor={'#BFBFBF'}
            // onFocus={this._onFous.bind(this)}
            autoFocus={true}
            keyboardType="default" />
        </View>
        {this.state.searchtext == "" ?
          <View style={sty.noData}>
            <Text style={{ fontSize: 20, color: 'black' }}> 请稍后，正在搜索数据……</Text>
          </View> :
          this.state.data.map((item) => {
            return (
              <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.item} onPress={() => this.Goback(item)} >
                  <Mylist data={item} />
                </TouchableOpacity>
              </ScrollView>
            )
          })
        }
        <ScrollView style={sty.scrollView}>
          <View style={sty.head1}>
            <Text style={{ fontSize: 14, color: "#333" }}>{"历史搜索"}</Text>
            <TouchableOpacity activeOpacity={0.3} onPress={() => { }}>
              <Image style={{ width: 15, height: 15 }} source={require('../images/recyclebin_icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={sty.noData}>
            <Text style={sty.noDataTxt}>暂无搜索历史</Text>
          </View>
          <View style={sty.head}>
            <Text style={{ fontSize: 14, color: "#333" }}>{"热门搜索"}</Text>
          </View>
          <View style={sty.noData}>
            <Text style={sty.noDataTxt}>更多热词敬请期待</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputBox: {
    height: 35,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    borderWidth: 0,
    marginTop: 10,
  },
  lin: {
    height: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#f1f1f1',
    marginTop: 10,
  },
  scrollView: {},
  listView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
  },
  head1: {
    paddingHorizontal: 16,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  head: {
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  queryList: {
    marginTop: 10,
    marginRight: 16,
    marginLeft: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  queryItem: {
    flex: 1,
    fontSize: 12,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 10
  },
  inputIcon: {
    margin: 10,
    width: 10,
    height: 10,
  },
  inputText: {
    flex: 1,
    paddingLeft: 5,
    textAlignVertical: 'center',
    paddingVertical: 0
  },
  noData: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 12,
  },
  noDataTxt: {
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: 80,
  },
  item: {
    height: 80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    fontSize: 20,
    width: 500,
    margin: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#841584',
    padding: 5
  },
});