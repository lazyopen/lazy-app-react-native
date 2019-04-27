import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import px2dp from '../util';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavBar extends Component {
  renderBtn (pos) {
    let render = (obj) => {
      const { name, onPress, text, color = '#fff', ref } = obj;
      if (Platform.OS === 'android') {
        return (
          <TouchableNativeFeedback onPress={() => onPress(this.refs[ref])} style={styles.btn}>
            <View ref={ref} >
              {name ? <Icon name={name} size={px2dp(26)} color={color} /> : null}
              {text ? <Text style={{color: color, fontSize: px2dp(16)}}>{text}</Text> : null}
            </View>
          </TouchableNativeFeedback>
        );
      } else {
        return (
          <TouchableOpacity ref={ref} onPress={() => onPress(this.refs[ref])} style={styles.btn}>
            {name ? <Icon name={name} size={px2dp(26)} color={color} /> : null}
            {text ? <Text style={{color: color, fontSize: px2dp(16)}}>{text}</Text> : null}
          </TouchableOpacity>
        );
      }
    };
    if (pos === 'left') {
      if (this.props.leftIcon || this.props.leftText) {
        return render({
          ref: 'leftNavBtn',
          text: this.props.leftText,
          name: this.props.leftIcon,
          color: this.props.leftColor,
          onPress: this.props.leftPress,
        });
      } else {
        return (<View style={styles.btn} />);
      }
    } else if (pos === 'right') {
      if (this.props.rightIcon || this.props.rightText) {
        return render({
          ref: 'rightNavBtn',
          text: this.props.rightText,
          name: this.props.rightIcon,
          color: this.props.rightColor,
          onPress: this.props.rightPress,
        });
      } else {
        return (<View style={styles.btn} />);
      }
    }
  }
  render () {
    return (
      <View style={[styles.bar, this.props.style]}>
        {this.renderBtn('left')}
        <Animated.Text numberOfLines={1} style={[styles.title, this.props.titleStyle]}>{this.props.title}</Animated.Text>
        {this.renderBtn('right')}
      </View>
    );
  }
}

NavBar.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  leftPress: PropTypes.func,
  rightPress: PropTypes.func,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
};
NavBar.topbarHeight = (Platform.OS === 'ios' ? 64 : 42);

const styles = StyleSheet.create({
  bar: {
    height: NavBar.topbarHeight,
    backgroundColor: '#0398ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: px2dp(10),
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: px2dp(16),
    marginLeft: px2dp(5),
  },
});
