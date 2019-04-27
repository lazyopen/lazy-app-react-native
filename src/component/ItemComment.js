import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableOpacity, PixelRatio, TouchableNativeFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp, {computeTime, parseImgUrl} from '../util/index';
import theme from '../config/theme';

export default class ItemComment extends Component {
  constructor(props) {
    super(props);
    let {ups} = this.props.itemData.item;
    this.state = {
      ups,
      flagUp: false,
    };
  }

  _itemClickCallback(itemData) {
    let { onPress = () => {} } = this.props;
    onPress(itemData.item);
  }

  _itemUpClickCallback(itemData) {
    let {ups, flagUp} = this.state;
    if (!flagUp) {
      this.setState({ups: ups + 1, flagUp: true});
      let { onPressUp = () => {} } = this.props;
      onPressUp(itemData.item);
    }
  }

  // _itemReplyClickCallback(itemData) {
  //   let { onReplyPress = () => {} } = this.props;
  //   onReplyPress(itemData.item);
  // }
  _renderItemContent(itemData) {
    let {commentUser = {}, content, replyCount, createTime} = itemData.item;
    let borderTop = itemData.index === 0 ? {borderTopWidth: 0} : {};
    let upsActive = this.state.flagUp ? {color: '#eb6f5a'} : {};
    return (
      <View style={[styles.item, borderTop]}>
        <View style={{flexDirection: 'row', marginTop: px2dp(5)}}>
          <View style={{
            flex: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'}}>
            <Image source={parseImgUrl(commentUser.userImg)} style={styles.userImage} />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.infoText} numberOfLines={1}>{commentUser.nickname}</Text>
              <Text style={[styles.infoText, {marginTop: px2dp(2), fontSize: px2dp(11)}]} numberOfLines={1}>{computeTime(createTime)}</Text>
            </View>
          </View>
          <View style={{
            flex: 50,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-start'}}>
            <TouchableOpacity
              onPress={this._itemUpClickCallback.bind(this, itemData)}
              activeOpacity={theme.btnActiveOpacity}>
              <Text style={[styles.infoText, upsActive]} numberOfLines={1}>{this.state.ups} <Icon name='ios-thumbs-up-outline' size={px2dp(18)} /></Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._itemClickCallback.bind(this, itemData)}
              activeOpacity={theme.btnActiveOpacity}>
              <Text style={[styles.infoText, {marginLeft: 10}]} numberOfLines={1}>回复 <Icon name='md-text' color={theme.grayIconColor} size={px2dp(18)} /></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginVertical: px2dp(8), paddingLeft: px2dp(29)}}>
          <Text style={{fontSize: px2dp(14), color: theme.blackTextColor}} >{content}</Text>
        </View>
        {replyCount > 0
          ? <View style={{flexDirection: 'row', paddingLeft: px2dp(29)}}>
            <Text style={{fontSize: px2dp(11), color: theme.grayTextColor}} >查看全部{replyCount}条回复</Text>
            <Text style={{marginBottom: 1, marginLeft: 5}} ><Icon name='ios-arrow-forward-outline' color={theme.grayIconColor} size={px2dp(14)} /></Text>
          </View> : null
        }
      </View>
    );
  }

  _renderItem() {
    let {itemData} = this.props;
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={this._itemClickCallback.bind(this, itemData)}
          activeOpacity={theme.btnActiveOpacity}>
          {this._renderItemContent(itemData)}
        </TouchableOpacity>
      );
    } else if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={this._itemClickCallback.bind(this, itemData)}>
          {this._renderItemContent(itemData)}
        </TouchableNativeFeedback>
      );
    }
  }
  render() {
    return this._renderItem();
  }
}

ItemComment.propTypes = {
  onPress: PropTypes.any,
  onPressUp: PropTypes.any,
  ups: PropTypes.number,
  itemData: PropTypes.object,
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: theme.screenWidth - theme.globalPadding,
    paddingVertical: theme.globalPadding,
    paddingRight: theme.globalPadding,
    marginLeft: theme.globalPadding,
    borderTopColor: '#d5d5d5',
    borderTopWidth: 1 / PixelRatio.get(),
  },
  userImage: {
    height: px2dp(24),
    width: px2dp(24),
    marginRight: px2dp(5),
    borderRadius: px2dp(12),
    backgroundColor: '#f4f4f4',
    resizeMode: 'cover',
  },
  infoText: {
    fontSize: px2dp(12),
    color: theme.grayTextColor,
  },
});
