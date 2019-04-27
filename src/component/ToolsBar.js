import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import px2dp from '../util';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ToolsBar extends Component {
  renderBtn (pos) {
    let render = (obj) => {
      const { icon, iconSize = 24, key, onPress, text, count, color = '#555555', textColor = '#555555', ref, custom } = obj;
      if (Platform.OS === 'android') {
        return (
          <TouchableNativeFeedback key={key} ref={ref} onPress={() => onPress(this.refs[ref])}>
            <View style={styles.btn}>
              {icon ? <Icon name={icon} size={iconSize} color={color} /> : null}
              {count ? <Text style={styles.count}>{count > 999 ? '999+' : count}</Text> : null}
              {text ? <Text style={[styles.text, {color: textColor}]}>{text}</Text> : null}
              {custom || null}
            </View>
          </TouchableNativeFeedback>
        );
      } else {
        return (
          <TouchableOpacity key={key} ref={ref} onPress={() => onPress(this.refs[ref])} style={styles.btn}>
            {icon ? <Icon name={icon} size={iconSize} color={color} /> : null}
            {count ? <Text style={styles.count}>{count > 999 ? '999+' : count}</Text> : null}
            {text ? <Text style={[styles.text, {color: textColor}]}>{text}</Text> : null}
            {custom || null}
          </TouchableOpacity>
        );
      }
    };
    let {text, icon, key, custom} = pos;
    if (text || icon || custom) {
      return render(pos);
    } else {
      return (<View key={key} style={styles.btn} />);
    }
  }
  render () {
    let {items} = this.props;
    return (
      <View style={[styles.bar, this.props.style]}>
        {
          items.map((item, key) => {
            return (
              this.renderBtn({ ...item, key, ref: 'tool' + key })
            );
          })
        }
      </View>
    );
  }
}

ToolsBar.propTypes = {
  items: PropTypes.array,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  bar: {
    height: 42,
    backgroundColor: '#f9f8f9',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: px2dp(10),
  },
  btn: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 3,
    fontSize: 13,
  },
  count: {
    color: '#d76a62',
    marginBottom: 12,
    fontSize: 12,
    fontWeight: '600',
  },
});
