import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, PixelRatio} from 'react-native';
import px2dp from '../util/index';

export default class TextDivider extends Component {
  render () {
    return (
      <View style={styles.view}>
        <View style={styles.divider} />
        <Text style={styles.text}>{this.props.text}</Text>
        <View style={styles.divider} />
      </View>
    );
  }
}

TextDivider.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    backgroundColor: '#c4c4c4',
    height: 1 / PixelRatio.get(),
  },
  text: {
    color: '#c4c4c4',
    fontSize: px2dp(10),
    marginLeft: px2dp(9),
    marginRight: px2dp(9),
  },
});
