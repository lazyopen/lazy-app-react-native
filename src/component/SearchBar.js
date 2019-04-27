import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, PixelRatio} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchBar extends Component {
    static propTypes = {
      onPress: PropTypes.func,
    };

    render() {
      if (Platform.OS === 'android') {
        return (
          <View style={styles.container}>
            <TouchableNativeFeedback onPress={this.props.onPress}>
              {this.renderContent()}
            </TouchableNativeFeedback>
          </View>
        );
      } else if (Platform.OS === 'ios') {
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={theme.btnActiveOpacity}>
              {this.renderContent()}
            </TouchableOpacity>
          </View>
        );
      }
    }

    renderContent() {
      return (
        <View style={styles.searchBar}>
          <Icon name='ios-search' size={px2dp(22)} color='#888888' />
          <Text style={styles.text}>搜索懒人工作台上的文章</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    height: theme.actionBar.height,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    borderBottomColor: '#d5d5d5',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  searchBar: {
    flexDirection: 'row',
    height: px2dp(33),
    borderRadius: px2dp(33),
    paddingLeft: px2dp(13),
    paddingRight: px2dp(13),
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px2dp(8),
    marginLeft: px2dp(8),
  },
  text: {
    fontSize: px2dp(14),
    color: '#b1b1b1',
    marginLeft: px2dp(13),
  },
});
