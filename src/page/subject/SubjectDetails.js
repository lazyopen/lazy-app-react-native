import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Alert, Image, Text, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import FooterLoading from '../../component/base/FooterLoading';
import EmptyData from '../../component/base/EmptyData';
import { getSubjectDocList } from '../../actions/subject';
import theme from '../../config/theme';
import { delSubject } from '../../services/subjectService';
import px2dp, {parseImgUrl} from '../../util';
import { SegmentedView } from 'teaset';
import ItemDoc from '../../component/ItemDoc';

class SubjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
    this._getDocList = this._getDocList.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
  }
  componentDidMount() {
    let {id, tabIndex} = this.state;
    let sort = tabIndex === 0 ? 0 : 5;
    let docList = this.props[sort + id];
    if (!docList || docList.list.length === 0) {
      this._getDocList(1);
    }
  }
  back() {
    this.props.router.pop();
  }

  _onPressDelSubject(item) {
    Alert.alert(
      '删除文章',
      '确认删除[' + item.title + ']？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '删除',
          onPress: () => {
            let {dispatch} = this.props;
            dispatch(delSubject(item));
          } },
      ],
      { cancelable: false }
    );
  }

  _getDocList(page) {
    let {dispatch, id} = this.props;
    let {tabIndex} = this.state;
    dispatch(getSubjectDocList({sort: tabIndex === 0 ? 0 : 5, subjectId: id, page}));
  }

  _onEndReached(info) {
    // console.log('info', info);
    if (info.distanceFromEnd > 0) {
      let {id} = this.props;
      let subject = this.props['0' + id] || {};
      let dataPage = subject.page + 1;
      if (dataPage <= subject.maxPage) {
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
    let {id, refreshing, loadedData, subjectCover, subjectName, subjectDesc, docCount} = this.props;
    let { page, maxPage, list = [] } = this.props['0' + id] || {};
    return (
      <View style={styles.container}>
        <NavBar
          title=''
          titleStyle={{color: '#333333'}}
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
          leftColor='#bebebe'
          style={{backgroundColor: '#ffffff'}}
        />
        <View style={styles.detail}>
          <View style={{flexDirection: 'row'}}>
            <Image source={parseImgUrl(subjectCover)} style={styles.itemImage} />
            <View>
              <Text style={styles.title} numberOfLines={2}>{subjectName}</Text>
              <Text style={styles.detailText} numberOfLines={1}> {docCount} 篇文章 </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title} numberOfLines={1}> {subjectDesc} </Text>
          </View>
        </View>
        <SegmentedView style={{flex: 1}} type='projector' onChange={(tabIndex) => { this.setState({tabIndex}); this._getDocList(1); }}>
          <SegmentedView.Sheet title='最新收入'>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <FlatList
                tintColor='#fff'
                colors={['#ddd', '#0398ff']}
                progressBackgroundColor='#ffffff'
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.1}
                refreshing={refreshing}
                onRefresh={this._onRefresh}
                style={styles.listView}
                data={list}
                renderItem={(itemData) => { return (<ItemDoc onPress={this._onPressItem} show itemData={{...itemData, showTime: itemData.item.subjectDoc.createTime}} />); }}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
                ListEmptyComponent={() => { return (<EmptyData marginTop={50} />); }}
              />
            </View>
          </SegmentedView.Sheet>
          <SegmentedView.Sheet title='热门'>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <FlatList
                tintColor='#fff'
                colors={['#ddd', '#0398ff']}
                progressBackgroundColor='#ffffff'
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.1}
                refreshing={refreshing}
                onRefresh={this._onRefresh}
                style={styles.listView}
                data={list}
                renderItem={(itemData) => { return (<ItemDoc onPress={this._onPressItem} itemData={itemData} />); }}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
                ListEmptyComponent={() => { return (<EmptyData marginTop={50} />); }}
              />
            </View>
          </SegmentedView.Sheet>
        </SegmentedView>
      </View>
    );
  }
}

SubjectDetails.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  id: PropTypes.string,
  loadedData: PropTypes.any,
  refreshing: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    backgroundColor: '#fff',
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
  detail: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: theme.globalPadding,
    borderBottomColor: '#d5d5d5',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  detailText: {
    fontSize: px2dp(12),
    lineHeight: px2dp(22),
    color: theme.grayTextColor,
  },
});

SubjectDetails.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  subjectCover: PropTypes.any,
  subjectName: PropTypes.any,
  docCount: PropTypes.any,
};
const select = (state = {}) => {
  let {subject, subjectUI} = state;
  return {...subject, ...subjectUI};
};
export default connect(select)(SubjectDetails);
