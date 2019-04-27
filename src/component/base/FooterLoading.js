import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

class FooterLoading extends Component {
  static propTypes = {
    show: PropTypes.any,
    endMsg: PropTypes.any,
    noData: PropTypes.any,
    size: ActivityIndicator.propTypes.size,
    color: ActivityIndicator.propTypes.color,
  };

  render () {
    let {color, size, show, noData, endMsg = '我是有底线的 (｡í _ ì｡)'} = this.props;
    if (show) {
      return (
        <View style={{justifyContent: 'center', padding: 8, flexDirection: 'row'}}>
          <ActivityIndicator animating={show} size={size} color={color} />
          <Text style={{color: '#999', fontSize: 12, marginTop: 2}}> 拼命加载中...</Text>
        </View>
      );
    }
    if (noData) {
      return (
        <View style={{justifyContent: 'center', padding: 8, flexDirection: 'row'}}>
          <Text style={{color: '#999', fontSize: 12, marginTop: 2}}>{endMsg}</Text>
        </View>
      );
    }
    return null;
  }
}
export default FooterLoading;
