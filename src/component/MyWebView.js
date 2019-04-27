import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import NavBar from '../component/NavBar';
const { width } = Dimensions.get('window');

export default class MyWebView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      progress: new Animated.Value(10),
      error: false,
    };
    let noop = () => {};
    let {onLoad, onLoadStart, onError} = this.props;
    this.__onLoad = onLoad || noop;
    this.__onLoadStart = onLoadStart || noop;
    this.__onError = onError || noop;
  }
  _onLoad () {
    Animated.timing(this.state.progress, {
      toValue: width,
      duration: 200,
    }).start(() => {
      setTimeout(() => {
        this.state.progress.setValue(0);
      }, 300);
    });
    this.__onLoad();
  }
  _onLoadStart () {
    this.state.progress.setValue(0);
    Animated.timing(this.state.progress, {
      toValue: width * 0.7,
      duration: 5000,
    }).start();
    this.__onLoadStart();
  }
  _onError () {
    setTimeout(() => {
      this.state.progress.setValue(0);
    }, 300);
    this.setState({error: true});
    this.__onError();
  }
  render () {
    let {title, leftPress, style} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title={title}
          leftIcon='ios-arrow-back'
          leftPress={leftPress}
        />
        <WebView
          style={[styles.webViewStyle, style]} {...this.props}
          onLoad={this._onLoad.bind(this)}
          onLoadStart={this._onLoadStart.bind(this)}
          onError={this._onError.bind(this)}
        />
        <View style={[styles.infoPage, this.state.error ? styles.showInfo : {}]}>
          <Text style={{color: '#aaa'}}>{'加载失败'}</Text>
        </View>
        <Animated.View style={[styles.progress, {width: this.state.progress}]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
  },
  progress: {
    position: 'absolute',
    height: 2,
    left: 0,
    top: Platform.OS === 'ios' ? 64 : 42,
    overflow: 'hidden',
    backgroundColor: '#25c538',
  },
  infoPage: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    paddingTop: 50,
    alignItems: 'center',
    transform: [
      {translateX: width},
    ],
    backgroundColor: '#f3f3f3',
  },
  showInfo: {
    transform: [
      {translateX: 0},
    ],
  },
});

MyWebView.propTypes = {
  title: PropTypes.string,
  leftPress: PropTypes.func,
  style: PropTypes.any,
  onLoad: PropTypes.any,
  onLoadStart: PropTypes.any,
  onError: PropTypes.any,
};
