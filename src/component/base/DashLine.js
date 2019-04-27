import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 虚线组件
 * @param {String} color 线条颜色
 * @param {String} backgroundColor 背景颜色
 * @param {Number} lineWidth 线条粗细
 * @param {Object} style 组件样式
 */
class DashLine extends Component {
  render () {
    let {color = '#d9d9d9', backgroundColor = 'white', lineWidth = 1, style = {}} = this.props;
    let wrapperStyle = {
      height: lineWidth,
      marginTop: 10,
      overflow: 'hidden',
      backgroundColor: backgroundColor,
    };
    let lineStyle = {
      height: 0,
      borderColor: color,
      borderWidth: lineWidth,
      borderStyle: 'dashed',
    };
    let lineMask = {
      marginTop: -lineWidth,
      height: lineWidth,
      backgroundColor: backgroundColor,
    };
    return (
      <View style={[wrapperStyle, style]}>
        <View style={lineStyle} />
        {Platform.OS === 'android' ? <View style={lineMask} /> : null}
      </View>
    );
  }
}
DashLine.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  lineWidth: PropTypes.number,
  style: PropTypes.object,
};
export default DashLine;
