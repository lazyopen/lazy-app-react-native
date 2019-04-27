import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast, Drawer, Theme, ModalIndicator } from 'teaset';
import NavBar from '../../component/NavBar';
import ToolsBar from '../../component/ToolsBar';
import * as commentService from '../../services/commentService';
import px2dp, {size} from '../../util/index';
import TextButton from '../../component/TextButton';
import EmptyData from '../../component/base/EmptyData';
import { getComment, addComment } from '../../actions/comment';
import FooterLoading from '../../component/base/FooterLoading';
import ItemComment from '../../component/ItemComment';
import theme from '../../config/theme';

class CommentDetails extends Component {
  constructor(props) {
    super(props);
    this._onPressComment = this._onPressComment.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
    this._onPressUp = this._onPressUp.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this._submitComment = this._submitComment.bind(this);
    this._cancelComment = this._cancelComment.bind(this);
    this._getCommentList = this._getCommentList.bind(this);
  }

  componentWillMount() {
    this._getCommentList(1);
  }
  back() {
    this.props.router.pop();
  }
  _onViewableItemsChanged(info) {
    // console.log(info);
  }
  _cancelComment() {
    this.drawer.close();
  }
  async _submitComment() {
    let {id, objectId, dispatch} = this.props;
    let {content = ''} = this;
    if (content === '') {
      return false;
    }
    ModalIndicator.show();
    const handle = await commentService.addComment({content, objectId, parentId: id});
    if (handle) {
      dispatch(addComment(handle));
      ModalIndicator.hide();
      Toast.message('回复成功', 1500);
      this.drawer.close();
    } else {
      ModalIndicator.hide();
    }
  }

  _onPressComment(item) {
    this.content = '';
    this.drawer = Drawer.open(
      <View style={{
        height: 290,
        justifyContent: 'flex-end',
      }}>
        <View style={{backgroundColor: Theme.defaultColor, height: px2dp(110)}}>
          <View style={{padding: px2dp(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TextButton text='取消' color='#83888d' fontSize={px2dp(14)} onPress={this._cancelComment} />
            <TextButton text='发布' color='#4b94f7' fontSize={px2dp(14)} onPress={this._submitComment} />
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
              onChangeText={(content) => this.content = item.id === this.props.id ? content : '回复' + item.commentUser.nickname + '：' + content}
              autoFocus
              multiline
              autoCapitalize='none'
              placeholder={'回复' + item.commentUser.nickname}
              style={styles.commentInput} />
          </View>
        </View>
      </View>, 'bottom', 'none', {containerStyle: {backgroundColor: 'rgba(0, 0, 0, 0)'}, autoKeyboardInsets: Platform.OS === 'ios'});
  }
  _onPressItem(item) {
    // console.log(item);
    // this.props.router.toDocDetails(item);
  }
  _onPressUp(item) {
    commentService.modifyComment({giveUp: 'up', id: item.id});
  }
  _getCommentList(page) {
    let {id, objectId} = this.props;
    this.props.dispatch(getComment({parentId: id, objectId, page}));
  }
  _onEndReached(info) {
    if (info.distanceFromEnd > 0) {
      let { commentDet } = this.props;
      let dataPage = commentDet.page + 1;
      if (dataPage <= commentDet.maxPage) {
        this._getCommentList(dataPage);
      }
    }
  }
  render() {
    let {commentDet = {}, refreshing, loadedData, commentUser} = this.props;
    let { page, maxPage, list = [] } = commentDet;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NavBar
          title='评论详情'
          titleStyle={{color: '#333333'}}
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
          leftColor='#bebebe'
          style={{backgroundColor: '#ffffff'}}
        />
        <ItemComment onPressUp={this._onPressUp} onPress={this._onPressComment} itemData={{item: this.props}}  />
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center'}}>
          <View style={styles.line} />
          <View style={{flex: 40, flexDirection: 'row', justifyContent: 'center', width: theme.screenWidth * 0.4}}>
            <Text>全部回复</Text>
          </View>
          <View style={styles.line} />
        </View>
        <FlatList
          ref={(flatList) => this._flatList = flatList}
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          style={styles.listView}
          data={list}
          refreshing={refreshing}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.2}
          renderItem={(itemData) => { return (<ItemComment onPressUp={this._onPressUp} onPress={this._onPressComment} itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading endMsg='已显示全部回复' noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          onViewableItemsChanged={this._onViewableItemsChanged.bind(this)}
          ListEmptyComponent={() => { return (<EmptyData marginTop={10} msg='这里还木有回复哦~' />); }}
        />
        <ToolsBar items={[
          { custom: <Text style={styles.customText}>回复{commentUser.nickname}：</Text>, onPress: this._onPressComment.bind(this, this.props) },
        ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#fff',
    paddingBottom: px2dp(42),
  },
  icon: {
    marginRight: px2dp(10),
    marginTop: px2dp(3),
    fontSize: px2dp(18),
    color: '#fff',
  },
  line: {
    flex: 30,
    width: theme.screenWidth * 0.3,
    borderTopColor: '#eeedee',
    borderTopWidth: 1,
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  customText: {
    height: px2dp(28),
    width: theme.screenWidth * 0.9,
    paddingLeft: px2dp(10),
    fontSize: px2dp(13),
    lineHeight: px2dp(26),
    textShadowRadius: px2dp(14),
    backgroundColor: '#eceded',
    color: '#999999',
  },
  commentInput: {
    height: px2dp(50),
    width: size().width - 20,
    padding: px2dp(10),
    fontSize: px2dp(14),
    lineHeight: px2dp(26),
    borderRadius: px2dp(10),
    backgroundColor: '#eceded',
  },

});

CommentDetails.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  id: PropTypes.string,
  objectId: PropTypes.string,
  commentDet: PropTypes.object,
  commentUser: PropTypes.object,
  loadedData: PropTypes.any,
  refreshing: PropTypes.any,
};

const select = (state = {}) => {
  let {comment, commentUI} = state;
  return {...comment, ...commentUI};
};

export default connect(select)(CommentDetails);
