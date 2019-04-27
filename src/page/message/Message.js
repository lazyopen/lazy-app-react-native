import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import ItemMessage from '../../component/ItemMessage';
import FooterLoading from '../../component/base/FooterLoading';
import { delMessage, getMessageList, markAsRead } from '../../actions/message';
import EmptyData from '../../component/base/EmptyData';
import theme from '../../config/theme';

class Message extends Component {
  constructor(props) {
    super(props);
    this._getMessageList = this._getMessageList.bind(this);
    this._delMessage = this._delMessage.bind(this);
    this._markMessageRead = this._markMessageRead.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }
  componentDidMount() {
    let {messagePage = {}} = this.props;
    if (messagePage.list.length === 0) {
      this._getMessageList(1);
    }
  }
  back() {
    this.props.router.pop();
  }

  _getMessageList(page) {
    this.props.dispatch(getMessageList({page}));
  }

  _onEndReached(info) {
    // console.log('info', info);
    if (info.distanceFromEnd > 0) {
      let { messagePage, loadedData} = this.props;
      let dataPage = messagePage.page + 1;
      if (dataPage <= messagePage.maxPage && !loadedData) {
        this._getMessageList(dataPage);
      }
    }
  }
  _onRefresh() {
    this._getMessageList(1);
  }

  _delMessage(item) {
    this.props.dispatch(delMessage(item));
  }

  _markMessageRead(item) {
    this.props.dispatch(markAsRead(item));
  }

  render() {
    let {messagePage = {}, refreshing, loadedData} = this.props;
    let { page, maxPage, list = [] } = messagePage;
    return (
      <View style={styles.container}>
        <NavBar
          title='消息通知'
          // leftIcon='ios-arrow-back'
          // leftPress={this.back.bind(this)}
        />
        <FlatList
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={this._onRefresh}
          style={styles.listView}
          data={list}
          renderItem={(itemData) => { return (<ItemMessage onPressActions={[this._markMessageRead, this._delMessage]} itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          ListEmptyComponent={() => { return (<EmptyData msg={'暂无消息通知'} />); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0398ff',
  },
  listView: {
    backgroundColor: '#fff',
    marginBottom: theme.bottomMenuHeight,
  },
});

Message.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  messagePage: PropTypes.object,
};
const select = (state = {}) => {
  let {message, messageUI} = state;
  return {...message, ...messageUI};
};
export default connect(select)(Message);
