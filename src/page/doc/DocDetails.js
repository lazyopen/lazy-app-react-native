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
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, Toast, Drawer, Theme, ModalIndicator } from 'teaset';
import NavBar from '../../component/NavBar';
import ToolsBar from '../../component/ToolsBar';
import DocContent from '../../component/DocContent';
import * as commentService from '../../services/commentService';
import * as docService from '../../services/docService';
import px2dp, {size, genColor} from '../../util/index';
import TextButton from '../../component/TextButton';
import EmptyData from '../../component/base/EmptyData';
import { getComment, addComment } from '../../actions/comment';
import { getDocUserRelation } from '../../actions/doc';
import FooterLoading from '../../component/base/FooterLoading';
import ItemComment from '../../component/ItemComment';

class DocDetails extends Component {
  constructor(props) {
    super(props);
    this.headerColor = genColor();
    let {commentCount, likeCount, readCount, collectCount, docUserRelation} = this.props;
    this.state = {
      commentCount,
      likeCount,
      readCount,
      collectCount,
      docUserRelation,
    };
    this._onPressComment = this._onPressComment.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
    this._onPressUp = this._onPressUp.bind(this);
    this._onPressGoComment = this._onPressGoComment.bind(this);
    this._onPressLike = this._onPressLike.bind(this);
    this._onPressCollect = this._onPressCollect.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this._onPressAddToSubject = this._onPressAddToSubject.bind(this);
    this._submitComment = this._submitComment.bind(this);
    this._cancelComment = this._cancelComment.bind(this);
    this._getDocUserRelation = this._getDocUserRelation.bind(this);
    this._getCommentList = this._getCommentList.bind(this);
  }

  componentWillUnmount() {
    docService.addDocUserRelation({docId: this.props.id, relationType: 0});
  }
  componentDidMount() {
    let {dispatch, id} = this.props;
    dispatch(getDocUserRelation({id}));
    dispatch(getComment({parentId: '0', objectId: id, page: 1}));
  }
  back() {
    this.props.router.pop();
  }
  _onPressMore(view) {
    let {docAuthor, currUser} = this.props;
    let {docUserRelation} = this.state;
    view.measureInWindow((x, y, width, height) => {
      let items = currUser.id === docAuthor.userId ? [
        {title: '收入专题', icon: <Icon name='ios-add-outline' style={styles.icon} />, onPress: this._onPressAddToSubject},
        {title: '编辑', icon: <Icon name='ios-create-outline' style={styles.icon} />, onPress: () => this.props.router.toEditDoc({editObj: this.props})},
      ] : [
        {title: '喜欢', icon: <Icon name={docUserRelation[1] ? 'ios-heart' : 'ios-heart-outline'} style={styles.icon} />, onPress: this._onPressLike},
        {title: '收藏', icon: <Icon name={docUserRelation[2] ? 'ios-star' : 'ios-star-outline'} style={styles.icon} />, onPress: this._onPressCollect},
        {title: '收入专题', icon: <Icon name='ios-add-outline' style={styles.icon} />, onPress: this._onPressAddToSubject},
      ];
      Menu.show({x, y, width, height}, items, {align: 'end', showArrow: true, alignInsets: -8});
    });
  }
  _onPressAddToSubject() {
    let {id, router} = this.props;
    console.log('docId:', id);
    router.toAddSubjectDoc({docId: id});
  }
  _onViewableItemsChanged() {
    // console.log(info);
  }
  _cancelComment() {
    this.drawer.close();
  }
  _onPressGoComment() {
    let {comment = {}} = this.props;
    if (comment.list.length > 0) {
      this._flatList.scrollToIndex({viewPosition: 0, index: 0});
    }
  }
  async _submitComment() {
    let {content = ''} = this;
    let {dispatch,id} = this.props;
    if (content === '') {
      return Toast.sad('写点评论吧');
    }
    ModalIndicator.show();
    const handle = await commentService.addComment({content, objectId: id, parentId: '0'});
    if (handle) {
      dispatch(addComment(handle));
      ModalIndicator.hide();
      this.setState({commentCount: this.state.commentCount + 1});
      Toast.message('评论成功', 1500);
      this.drawer.close();
    } else {
      ModalIndicator.hide();
    }
  }

  async _onPressLike() {
    let {id} = this.props;
    let {likeCount, docUserRelation} = this.state;
    if (docUserRelation[1]) {
      if (docUserRelation[1].id) {
        docService.delDocUserRelation({id: docUserRelation[1].id});
        this.setState({
          likeCount: likeCount - 1,
          docUserRelation: {
            ...docUserRelation,
            1: false,
          },
        });
      }
    } else {
      let handle = await docService.addDocUserRelation({docId: id, relationType: 1});
      this.setState({
        likeCount: likeCount + 1,
        docUserRelation: {
          ...docUserRelation,
          1: handle,
        },
      });
    }
  }
  async _onPressCollect() {
    let {id} = this.props;
    let {collectCount, docUserRelation} = this.state;
    if (docUserRelation[2]) {
      if (docUserRelation[2].id) {
        docService.delDocUserRelation({id: docUserRelation[2].id});
        this.setState({
          collectCount: collectCount - 1,
          docUserRelation: {
            ...docUserRelation,
            2: false,
          },
        });
        Toast.message('取消收藏', 1500);
      }
    } else {
      let handle = await docService.addDocUserRelation({docId: id, relationType: 2});
      this.setState({
        collectCount: collectCount + 1,
        docUserRelation: {
          ...docUserRelation,
          2: handle,
        },
      });
      Toast.message('已收藏', 1500);
    }
  }
  _onPressComment() {
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
              onChangeText={(content) => this.content = content}
              autoFocus
              multiline
              autoCapitalize='none'
              placeholder={'写评论'}
              style={styles.commentInput} />
          </View>
        </View>
      </View>, 'bottom', 'none', {containerStyle: {backgroundColor: 'rgba(0, 0, 0, 0)'}, autoKeyboardInsets: Platform.OS === 'ios'});
  }
  _onPressItem(item) {
    console.log(item);
    this.props.router.toCommentDetails(item);
  }
  _onPressUp(item) {
    commentService.modifyComment({giveUp: 'up', id: item.id});
  }
  _getDocUserRelation() {
    let {id, dispatch} = this.props;
    dispatch(getDocUserRelation({id}));
  }
  _getCommentList(page) {
    this.props.dispatch(getComment({parentId: '0', objectId: this.props.id, page}));
  }
  _onEndReached(info) {
    if (info.distanceFromEnd > 0) {
      let { comment } = this.props;
      let dataPage = comment.page + 1;
      if (dataPage <= comment.maxPage) {
        this._getCommentList(dataPage);
      }
    }
  }
  _renderHeader() {
    return (
      <DocContent data={{...this.props, ...this.state}} />
    );
  }
  render() {
    let {comment = {}, refreshing, loadedData, docAuthor, currUser} = this.props;
    let {docUserRelation, commentCount, likeCount} = this.state;
    let { page, maxPage, list = [] } = comment;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NavBar
          rightIcon='ios-more'
          rightPress={this._onPressMore.bind(this)}
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
          style={{backgroundColor: this.headerColor}}
        />
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
          renderItem={(itemData) => { return (<ItemComment onPressUp={this._onPressUp} onPress={this._onPressItem} itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          ListHeaderComponent={this._renderHeader.bind(this)}
          onViewableItemsChanged={this._onViewableItemsChanged.bind(this)}
          ListEmptyComponent={() => { return (<EmptyData marginTop={10} msg='这里还木有评论哦~' />); }}
        />
        <ToolsBar items={
          [{ custom: <Text style={styles.customText}>写评论</Text>, onPress: this._onPressComment },
            { icon: 'ios-chatboxes-outline', onPress: this._onPressGoComment, count: commentCount },
            { icon: docUserRelation[1] ? 'ios-heart' : 'ios-heart-outline', color: docUserRelation[1] ? '#eb6f5a' : null, onPress: this._onPressLike },
            { icon: docUserRelation[2] ? 'ios-star' : 'ios-star-outline', color: docUserRelation[2] ? '#ffbe37' : null, iconSize: 27, onPress: this._onPressCollect }]
        } />
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
  tools: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  customText: {
    height: px2dp(28),
    width: px2dp(120),
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

DocDetails.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  id: PropTypes.string,
  comment: PropTypes.object,
  docAuthor: PropTypes.object,
  currUser: PropTypes.object,
  loadedData: PropTypes.any,
  refreshing: PropTypes.any,
  commentCount: PropTypes.number,
  likeCount: PropTypes.number,
  readCount: PropTypes.number,
  collectCount: PropTypes.number,
  docUserRelation: PropTypes.object,
};

const select = (state = {}) => {
  let {comment, commentUI, doc, user, subject} = state;
  return {...comment, ...commentUI, ...doc, currUser: user.user, ...subject};
};

export default connect(select)(DocDetails);
