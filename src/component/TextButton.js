import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity} from 'react-native';
import px2dp from '../util/index';

export default class TextButton extends Component {
  render () {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}>
        <View style={{height: px2dp(16)}}>
          <Text style={{fontSize: this.props.fontSize, color: this.props.color}}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

TextButton.defaultProps = {
  color: '#c4c4c4',
  fontSize: px2dp(12),
};

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
  fontSize: PropTypes.number,
};
