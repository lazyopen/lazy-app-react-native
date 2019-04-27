import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../../util';
import theme from '../../config/theme';
import { SearchInput, ModalIndicator } from 'teaset';
import { addSearchDocKeyword, searchDoc } from '../../actions/search';
import EmptyData from '../../component/base/EmptyData';
import FooterLoading from '../../component/base/FooterLoading';
import ItemDoc from '../../component/ItemDoc';

class SearchDoc extends Component {
  constructor (props) {
    super(props);
    this.state = {
      keyword: null,
    };
    this.back = this.back.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
    this._getDocList = this._getDocList.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }
  componentWillUnmount() {
    this.props.dispatch({type: 'CLEAR_SEARCH_DOC'});
  }
  back() {
    this.props.router.pop();
  }
  _submitSearch () {
    let {keyword} = this.state;
    if (keyword != null && keyword !== '' && keyword.trim() !== '') {
      ModalIndicator.show('正在搜索...');
      this.props.dispatch(addSearchDocKeyword(keyword));
      this._getDocList(1);
      let {searchDoc = {}} = this.props;
      if (searchDoc.list.length > 0) {
        this._flatList.scrollToIndex({viewPosition: 0, index: 0});
      }
    }
  }
  _getDocList(page) {
    let {keyword} = this.state;
    this.props.dispatch(searchDoc({keyword, page}));
  }
  _onEndReached(info) {
    if (info.distanceFromEnd > 0) {
      let { searchDoc } = this.props;
      let dataPage = searchDoc.page + 1;
      if (dataPage <= searchDoc.maxPage) {
        this._getDocList(dataPage);
      }
    }
  }
  _onPressItem(item) {
    let {router} = this.props;
    router.toDocDetails(item);
  }
  render () {
    let {searchDoc = {}, refreshing, loadedData} = this.props;
    console.log('loadedData', loadedData);
    let { page, maxPage, total, list = [] } = searchDoc;
    if (!refreshing) {
      setTimeout(function () {
        ModalIndicator.hide();
      }, 250);
    }
    return (
      <View style={styles.wrap}>
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <SearchInput
              onChangeText={(keyword) => this.setState({keyword})}
              onSubmitEditing={this._submitSearch}
              returnKeyType='search' iconSize={20}
              style={styles.searchInput}
              value={this.state.keyword}
              placeholder='搜索文章' />
            <TouchableOpacity onPress={this.back}>
              <Text style={[styles.text, {color: '#d9705d'}]}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.head}>
          <Text style={{fontSize: px2dp(13), color: '#333'}}>{'历史搜索'}</Text>
          <TouchableOpacity onPress={() => this.props.dispatch({type: 'CLEAR_SEARCH_DOC_KEYWORD'})}>
            <Icon name={'ios-trash'} size={px2dp(16)} color='#333' />
          </TouchableOpacity>
        </View>
        <View style={styles.queryList}>
          {this.props.docKeyWord.map((item, i) => {
            return (
              <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                <TouchableOpacity onPress={() => {
                  this.setState({keyword: item});
                  setTimeout(() => {
                    this._submitSearch();
                  }, 500);
                }}>
                  <Text style={styles.queryItem}>{item}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* <View style={styles.head}> */}
        {/* <Text style={{fontSize: px2dp(13), color: '#333'}}>{'热门搜索'}</Text> */}
        {/* </View> */}
        {/* <View style={styles.queryList}> */}
        {/* {['贡茶', '大排档', '第一大排档', '果麦', '星巴克', '周黑鸭'].map((item, i) => { */}
        {/* return ( */}
        {/* <View key={i} style={{marginRight: 12, marginBottom: 12}}> */}
        {/* <TouchableOpacity> */}
        {/* <Text style={styles.queryItem}>{item}</Text> */}
        {/* </TouchableOpacity> */}
        {/* </View> */}
        {/* ); */}
        {/* })} */}
        {/* </View> */}
        <FlatList
          ref={(flatList) => this._flatList = flatList}
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={this._onRefresh}
          style={styles.listView}
          data={list}
          renderItem={(itemData) => { return (<ItemDoc onPress={this._onPressItem} itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading endMsg={'已显示全部搜索结果 共 ' + total + ' 条'} noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          ListEmptyComponent={() => { return (<EmptyData msg={'没有搜索到内容'} marginTop={20} />); }}
        />
      </View>

    );
  }
}

SearchDoc.propTypes = {
  router: PropTypes.object,
  searchDoc: PropTypes.object,
  dispatch: PropTypes.func,
  loadedData: PropTypes.any,
  refreshing: PropTypes.any,
  docKeyWord: PropTypes.any,
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#eee',
    flex: 1,
  },
  head: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  queryList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  queryItem: {
    fontSize: px2dp(13),
    color: '#666',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
  },
  searchBar: {
    flexDirection: 'row',
    height: px2dp(33),
    paddingLeft: px2dp(13),
    paddingRight: px2dp(13),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px2dp(8),
    marginLeft: px2dp(8),
  },
  searchInput: {
    backgroundColor: '#f3f3f3',
    height: px2dp(33),
    borderRadius: px2dp(33),
    width: theme.screenWidth - px2dp(60),
    borderWidth: 0,
  },
  listView: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: px2dp(14),
    color: '#b1b1b1',
    marginLeft: px2dp(13),
  },
  container: {
    height: theme.actionBar.height,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    borderBottomColor: '#d5d5d5',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
});

const select = (state = {}) => {
  let {search, searchUI} = state;
  return {...search, ...searchUI};
};
export default connect(select)(SearchDoc);
