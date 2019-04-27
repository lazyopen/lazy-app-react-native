import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import ItemDoc from '../../component/ItemDoc';
import FooterLoading from '../../component/base/FooterLoading';
import EmptyData from '../../component/base/EmptyData';
import { getUserDoc } from '../../actions/user';
import { getDocUserRelation } from '../../actions/doc';
import { getComment } from '../../actions/comment';

class CollectDoc extends Component {
  constructor(props) {
    super(props);
    this._getDocList = this._getDocList.bind(this);
  }
  componentDidMount() {
    let {collectDoc = {}} = this.props;
    if (collectDoc.list.length === 0) {
      this._getDocList(1);
    }
  }
  back() {
    this.props.router.pop();
  }

  _getDocList(page) {
    this.props.dispatch(getUserDoc({docViewType: 3, page}));
  }

  _onEndReached(info) {
    // console.log('info', info);
    if (info.distanceFromEnd > 0) {
      let { collectDoc } = this.props;
      let dataPage = collectDoc.page + 1;
      if (dataPage <= collectDoc.maxPage) {
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
    let {collectDoc = {}, refreshing, loadedData} = this.props;
    let { page, maxPage, list = [] } = collectDoc;
    return (
      <View style={styles.container}>
        <NavBar
          title='收藏的文章'
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
          renderItem={(itemData) => { return (<ItemDoc onPress={this._onPressItem.bind(this)} itemData={itemData} />); }}
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

CollectDoc.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  collectDoc: PropTypes.object,
};
const select = (state = {}) => {
  let {user, userUI} = state;
  return {...user, ...userUI};
};
export default connect(select)(CollectDoc);
