import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp, {computeTime, parseImgUrl, getSimpleTxt} from '../util/index';
import theme from '../config/theme';
import Swipeout from 'react-native-swipeout';

export default class ItemDoc extends Component {
  constructor(props) {
    super(props);
  }

  _itemClickCallback(itemData) {
    let { onPress = () => {} } = this.props;
    onPress(itemData.item);
  }
  _renderItemContent(itemData) {
    // console.log('itemData', itemData);
    let {showTime, item} = itemData;
    let {title, readCount, likeCount, commentCount, createTime, coverImg, docTxt, docAuthor = {}} = item;
    let borderTop = itemData.index === 0 ? {borderTopWidth: 0} : {};
    return (
      <View style={[styles.item, borderTop]}>
        <View style={{flexDirection: 'row', marginTop: px2dp(5)}}>
          <View style={{
            flex: 70,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'}}>
            <Image source={parseImgUrl(docAuthor.userImg)} style={styles.userImage} />
            <Text style={styles.userText} numberOfLines={1}>{docAuthor.nickname}</Text>
          </View>
          <View style={{flex: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={styles.infoBarText} numberOfLines={1}>{computeTime(showTime || createTime)}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: px2dp(5)}}>
          <View style={{flex: 75}}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <View style={styles.docBar}>
              <Text style={styles.docBarText} numberOfLines={2}>{getSimpleTxt(docTxt.txt)}</Text>
            </View>
            <View style={[styles.docBar, {justifyContent: 'flex-start'}]}>
              <Text style={styles.docBarText} numberOfLines={1}>
                <Icon name='ios-chatbubbles' color={theme.grayIconColor} size={px2dp(16)} /> {commentCount}
              </Text>
              <Text style={[styles.docBarText, {marginLeft: px2dp(10)}]} numberOfLines={1}>
                <Icon name='ios-heart' color={theme.grayIconColor} size={px2dp(16)} /> {likeCount}
              </Text>
              <Text style={[styles.docBarText, {marginLeft: px2dp(10)}]} numberOfLines={1}>
                <Icon name='md-eye' color={theme.grayIconColor} size={px2dp(18)} /> {readCount}
              </Text>
            </View>
          </View>
          {coverImg
            ? <View style={{
              flex: 25,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'}}>
              <Image source={parseImgUrl(coverImg)} style={styles.itemImage} />
            </View> : null}
        </View>
      </View>
    );
  }

  _renderItem() {
    let {itemData, swipeActions = []} = this.props;
    if (swipeActions.length > 0) {
      return (
        <Swipeout
          key={itemData.index}
          autoClose
          right={swipeActions}
          backgroundColor='#ffffff'
        >
          <TouchableOpacity
            onPress={this._itemClickCallback.bind(this, itemData)}
            activeOpacity={theme.btnActiveOpacity}>
            {this._renderItemContent(itemData)}
          </TouchableOpacity>
        </Swipeout>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={this._itemClickCallback.bind(this, itemData)}
          activeOpacity={theme.btnActiveOpacity}>
          {this._renderItemContent(itemData)}
        </TouchableOpacity>
      );
    }
  }
  _renderMyDocItemContent(itemData) {
    // console.log(itemData);
    let {title, collectCount, likeCount, modifyTime, coverImg, docTxt} = itemData.item;
    let borderTop = itemData.index === 0 ? {borderTopWidth: 0} : {};
    return (
      <View style={[styles.item, borderTop]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.infoBarText, {fontSize: px2dp(11)}]} numberOfLines={1}>收藏 {collectCount} • 喜欢 {likeCount} • 更新于{computeTime(modifyTime, 'MM-dd HH:mm')}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 75}}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <View style={styles.docBar}>
              <Text style={styles.docBarText} numberOfLines={2}>{getSimpleTxt(docTxt.txt)}</Text>
            </View>
          </View>
          {coverImg
            ? <View style={{
              flex: 25,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-start'}}>
              <Image source={parseImgUrl(coverImg)} style={styles.itemImage} />
            </View> : null}
        </View>
      </View>
    );
  }

  _renderMyDocItem() {
    let {itemData, swipeActions = []} = this.props;
    if (swipeActions.length > 0) {
      return (
        <Swipeout
          key={itemData.index}
          autoClose
          right={swipeActions}
          backgroundColor='#ffffff'
        >
          <TouchableOpacity
            onPress={this._itemClickCallback.bind(this, itemData)}
            activeOpacity={theme.btnActiveOpacity}>
            {this._renderMyDocItemContent(itemData)}
          </TouchableOpacity>
        </Swipeout>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={this._itemClickCallback.bind(this, itemData)}
          activeOpacity={theme.btnActiveOpacity}>
          {this._renderMyDocItemContent(itemData)}
        </TouchableOpacity>
      );
    }
  }

  render() {
    let {viewType} = this.props;
    switch (viewType) {
      // 我的文章
      case 'myDoc':
        return this._renderMyDocItem();
      default:
        return this._renderItem();
    }
  }
}

ItemDoc.propTypes = {
  onPress: PropTypes.any,
  itemData: PropTypes.object,
  viewType: PropTypes.string,
  swipeActions: PropTypes.any,
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
  title: {
    color: theme.blackTextColor,
    fontSize: px2dp(16),
    paddingVertical: px2dp(5),
  },
  itemImage: {
    height: (theme.screenWidth - px2dp(42)) * 0.25,
    width: (theme.screenWidth - px2dp(42)) * 0.25,
    borderRadius: px2dp(5),
    backgroundColor: '#fff',
    resizeMode: 'cover',
  },
  userImage: {
    height: px2dp(24),
    width: px2dp(24),
    marginRight: px2dp(5),
    borderRadius: px2dp(12),
    backgroundColor: '#fff',
    resizeMode: 'cover',
  },
  userText: {
    fontSize: px2dp(11),
  },
  docBar: {
    flexDirection: 'row',
  },
  docBarText: {
    fontSize: px2dp(12),
    lineHeight: px2dp(22),
    color: theme.grayTextColor,
  },
  infoBar: {
    flexDirection: 'row',
  },
  infoBarText: {
    fontSize: px2dp(12),
    lineHeight: px2dp(22),
    color: theme.grayTextColor,
  },
});
