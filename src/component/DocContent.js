import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, StyleSheet, PixelRatio} from 'react-native';
import px2dp, {parseImgUrl, fmtLongDate} from '../util/index';
import { MarkdownView } from 'react-native-markdown-view';
import theme from '../config/theme';

const markdownStyles = {
  text: {
    fontSize: px2dp(16),
    lineHeight: px2dp(24),
  },
};

export default class DocContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {title, createTime, docTxt, docAuthor, commentCount, readCount, likeCount, collectCount} = this.props.data;
    return (
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={{flexDirection: 'row', marginTop: px2dp(5)}}>
            <View style={{
              flex: 70,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'}}>
              <Image source={parseImgUrl(docAuthor.userImg)} style={styles.userImage} />
              <Text style={{fontSize: px2dp(12)}} numberOfLines={1}>{docAuthor.nickname}</Text>
            </View>
            <View style={{flex: 30, marginTop: px2dp(5)}}>
              <View style={styles.infoRightBar}>
                <Text style={styles.infoBarText} numberOfLines={1}>{''}</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: px2dp(5)}}>
            <Text style={styles.infoBarText} numberOfLines={1}>{fmtLongDate(createTime, 'yyyy-MM-dd HH:mm')} • 阅读 {readCount} • 喜欢 {likeCount} • 收藏 {collectCount}</Text>
          </View>
          <MarkdownView styles={markdownStyles}>{docTxt.txt}</MarkdownView>
        </View>
        <View style={{
          paddingHorizontal: px2dp(15),
          paddingVertical: px2dp(10),
          backgroundColor: '#fcfcfc',
          borderBottomColor: '#d4d4d4',
          borderBottomWidth: 1 / PixelRatio.get(),
          borderTopColor: '#d4d4d4',
          borderTopWidth: 1 / PixelRatio.get(),
        }}>
          <Text style={{color: '#eb6f5a'}}>评论 {commentCount}</Text>
        </View>
      </View>
    );
  }
}

DocContent.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  content: {
    padding: theme.globalPadding,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: px2dp(26),
    fontWeight: '600',
  },
  userImage: {
    height: px2dp(24),
    width: px2dp(24),
    marginRight: px2dp(5),
    borderRadius: px2dp(12),
    backgroundColor: '#f4f4f4',
    resizeMode: 'cover',
  },
  infoRightBar: {
    flexDirection: 'row',
    marginTop: px2dp(3),
    justifyContent: 'flex-end',
  },
  infoBar: {
    flexDirection: 'row',
  },
  infoBarText: {
    fontSize: px2dp(13),
    color: theme.grayTextColor,
  },
});
