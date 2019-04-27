import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableHighlight, TouchableNativeFeedback} from 'react-native';
import px2dp from '../util/index';
import theme from '../config/theme';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
  };

  render() {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={this.props.onPress}>
          {this._renderContent()}
        </TouchableNativeFeedback>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight
          style={{flex: 1, height: px2dp(45)}}
          onPress={this.props.onPress}
          activeOpacity={theme.btnActiveOpacity}>
          {this._renderContent()}
        </TouchableHighlight>
      );
    }
  }

  _renderContent() {
    return (
      <View style={{flex: 1,
        height: px2dp(45),
        backgroundColor: '#4ba2ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3}}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: px2dp(13),
  },
});
