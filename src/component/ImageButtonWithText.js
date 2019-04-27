import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ImageButton extends Component {
  render () {
    const {image, icon, onPress} = this.props;

    if (Platform.OS === 'ios') {
      if (image) {
        return (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            {this._renderContentWithImage()}
          </TouchableOpacity>
        );
      } else if (icon) {
        return (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            {this._renderContentWithIcon()}
          </TouchableOpacity>
        );
      }
    } else if (Platform.OS === 'android') {
      if (image) {
        return (
          <TouchableNativeFeedback onPress={onPress}>
            {this._renderContentWithImage()}
          </TouchableNativeFeedback>
        );
      } else if (icon) {
        return (
          <TouchableNativeFeedback onPress={onPress}>
            {this._renderContentWithIcon()}
          </TouchableNativeFeedback>
        );
      }
    }
  }

  _renderContentWithImage () {
    const {text, image, color, imgSize, fontSize, btnStyle} = this.props;
    return (
      <View style={[styles.view, btnStyle]}>
        <Image source={image} style={{width: imgSize, height: imgSize}} />
        {text
          ? <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
          : null
        }
      </View>
    );
  }

  _renderContentWithIcon () {
    const {text, icon, color, imgSize, fontSize, btnStyle} = this.props;
    return (
      <View style={[styles.view, btnStyle]}>
        <Icon name={icon} size={imgSize} color={color} />
        {text
          ? <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
          : null
        }
      </View>
    );
  }
}
ImageButton.defaultProps = {
  imgSize: px2dp(40),
  fontSize: px2dp(12),
};

ImageButton.propTypes = {
  text: PropTypes.string,
  image: PropTypes.any,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  imgSize: PropTypes.number,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  btnStyle: View.propTypes.style,
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: px2dp(4),
  },
});
