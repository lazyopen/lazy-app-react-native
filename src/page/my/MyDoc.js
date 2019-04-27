import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import ItemDoc from '../../component/ItemDoc';
import FooterLoading from '../../component/base/FooterLoading';
import { getUserDoc, delUserDoc } from '../../actions/user';
import EmptyData from '../../component/base/EmptyData';
import { getDocUserRelation } from '../../actions/doc';
import { getComment } from '../../actions/comment';
import theme from '../../config/theme';

class MyDoc extends Component {
  constructor(props) {
    super(props);
    this._getDocList = this._getDocList.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
  }
  componentDidMount() {
    let {myDoc = {}} = this.props;
    if (myDoc.list.length === 0) {
      this._getDocList(1);
    }
  }
  back() {
    this.props.router.pop();
  }

  _onPressDelDoc(item) {
    Alert.alert(
      '删除文章',
      '确认删除[' + item.title + ']？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '删除',
          onPress: () => {
            let {dispatch} = this.props;
            dispatch(delUserDoc(item));
          } },
      ],
      { cancelable: false }
    );
  }

  _onPressEditDoc(item) {
    this.props.router.toEditDoc({editObj: item});
  }

  _getDocList(page) {
    this.props.dispatch(getUserDoc({docViewType: 1, page}));
  }

  _onEndReached(info) {
    // console.log('info', info);
    if (info.distanceFromEnd > 0) {
      let { myDoc } = this.props;
      let dataPage = myDoc.page + 1;
      if (dataPage <= myDoc.maxPage) {
        this._getDocList(dataPage);
      }
    }
  }
  _onRefresh() {
    this._getDocList(1);
  }

  _searchButtonCallback() {

  }

  _onPressItem(item) {
    let {router} = this.props;
    router.toDocDetails(item);
  }
  render() {
    let {myDoc = {}, refreshing, loadedData} = this.props;
    let { page, maxPage, list = [] } = myDoc;
    return (
      <View style={styles.container}>
        <NavBar
          title='我的文章'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <FlatList
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={this._onRefresh.bind(this)}
          style={styles.listView}
          data={list}
          renderItem={(itemData) => {
            return (<ItemDoc viewType='myDoc' swipeActions={[
              {
                text: '编辑',
                backgroundColor: '#c1c0c6',
                onPress: this._onPressEditDoc.bind(this, itemData.item),
              },
              {
                text: '删除',
                backgroundColor: '#d9534f',
                onPress: this._onPressDelDoc.bind(this, itemData.item),
              },
            ]} onPress={this._onPressItem} itemData={itemData} />);
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          ListEmptyComponent={() => { return (<EmptyData />); }}
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
  },
});

MyDoc.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  myDoc: PropTypes.object,
};
const select = (state = {}) => {
  let {user, userUI} = state;
  return {...user, ...userUI};
};
export default connect(select)(MyDoc);
