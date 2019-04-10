import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'

class Example extends Component {/* 使用按钮测试state更新机制 */} 
  constructor(props) {
    super(props);;
  }

  state = {
      value: 0
  }

  render() {
    return (
      <div>
          <div>The Value: {this.state.value}</div>
          <button onClick={::this._addValue}>add Value</button>
      </div>
  );
  }

  _addValue() {
      this.setState({
          value: this.state.value + 1
      })
      this.setState({
          value: this.state.value + 1
      })
  }
}

class App extends Component { {/* 每秒更新state来实现时间同步 */} 
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>北京时间 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('example')
);
ReactDOM.render(
  <Example />,
  document.getElementById('example')
);
export default App;
