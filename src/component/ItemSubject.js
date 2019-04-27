import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Image, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp, {computeTime, parseImgUrl, getSimpleTxt} from '../util/index';
import theme from '../config/theme';
import Swipeout from 'react-native-swipeout';
import { Button } from 'teaset';

export default class ItemSubject extends Component {
  constructor(props) {
    super(props);
    let revenue = false;
    let {subjectDoc = [], item} = this.props.itemData;
    console.log(this.props.itemData);
    subjectDoc.forEach((e) => {
      if (e.subjectId === item.id) {
        revenue = true;
      }
      // console.log('item', item);
    });
    this.state = {
      revenue,
    };
  }

  _itemClickCallback(itemData) {
    let { onPress = () => {} } = this.props;
    onPress(itemData.item);
  }
  _itemAddDocClickCallback(itemData) {
    let { onPress = () => {} } = this.props;
    let {revenue} = this.state;
    onPress(itemData, revenue);
    this.setState({revenue: !revenue});
  }
  _renderItemContent(itemData) {
    let {subjectName, subjectCover, subjectDesc, docCount, creator = {}} = itemData.item;
    let borderTop = itemData.index === 0 ? {borderTopWidth: 0} : {};
    return (
      <View style={[styles.item, borderTop]}>
        <View style={{flexDirection: 'row'}}>
          {subjectCover
            ? <Image source={parseImgUrl(subjectCover)} style={styles.itemImage} /> : null}
          <View>
            <Text style={styles.title} numberOfLines={2}>{subjectName}</Text>
            <View style={styles.docBar}>
              <Text style={styles.docBarText} numberOfLines={1}>{creator.nickname} • {docCount} 篇文章 </Text>
            </View>
          </View>
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

  _renderAddDocItemContent(itemData) {
    // console.log(itemData);
    let {subjectName, subjectCover, subjectDesc, docCount, creator = {}} = itemData.item;
    let borderTop = itemData.index === 0 ? {borderTopWidth: 0} : {};
    return (
      <View style={[styles.item, borderTop]}>
        <View style={{flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <Image source={parseImgUrl(subjectCover)} style={styles.itemImage} />
          <View style={{flex: 70}}>
            <Text style={styles.title} numberOfLines={2}>{subjectName}</Text>
            <View style={styles.docBar}>
              <Text style={styles.docBarText} numberOfLines={1}>{creator.nickname} • {docCount} 篇文章 </Text>
            </View>
          </View>
          <View style={{flex: 20}}>
            {this.state.revenue
              ? <Button onPress={this._itemAddDocClickCallback.bind(this, itemData)} style={{width: px2dp(60)}} type='danger' size='sm' title='移除' />
              : <Button onPress={this._itemAddDocClickCallback.bind(this, itemData)} style={{width: px2dp(60)}} type='default' size='sm' title='收入' />}
          </View>
        </View>
      </View>
    );
  }
  _renderAddDocItem() {
    let {itemData, swipeActions = []} = this.props;
    if (swipeActions.length > 0) {
      return (
        <Swipeout
          key={itemData.index}
          autoClose
          right={swipeActions}
          backgroundColor='#ffffff'
        >
          {this._renderAddDocItemContent(itemData)}
        </Swipeout>
      );
    } else {
      return this._renderAddDocItemContent(itemData);
    }
  }

  render() {
    let { viewType } = this.props;
    if (viewType === 'addDoc') {
      return this._renderAddDocItem();
    } else {
      return this._renderItem();
    }
  }
}

ItemSubject.propTypes = {
  onPress: PropTypes.any,
  itemData: PropTypes.object,
  swipeActions: PropTypes.any,
  viewType: PropTypes.any,
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
    height: px2dp(60),
    width: px2dp(60),
    borderRadius: px2dp(5),
    marginRight: 10,
    backgroundColor: '#fff',
    resizeMode: 'cover',
  },
  docBar: {
    flexDirection: 'row',
  },
  docBarText: {
    fontSize: px2dp(12),
    lineHeight: px2dp(22),
    color: theme.grayTextColor,
  },
});
