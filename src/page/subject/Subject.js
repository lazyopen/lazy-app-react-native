import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import ItemSubject from '../../component/ItemSubject';
import FooterLoading from '../../component/base/FooterLoading';
import EmptyData from '../../component/base/EmptyData';
import { getSubject, delSubject } from '../../actions/subject';
import theme from '../../config/theme';

class Subject extends Component {
  constructor(props) {
    super(props);
    this._getSubjectList = this._getSubjectList.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
  }
  componentDidMount() {
    let {subject = {}} = this.props;
    if (subject.list.length === 0) {
      this._getSubjectList(1);
    }
  }
  back() {
    this.props.router.pop();
  }

  _onPressDelSubject(item) {
    Alert.alert(
      '删除专题',
      '确认删除[' + item.subjectName + ']？',
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

  _onPressEditSubject(item) {
    this.props.router.toEditSubject({editObj: item});
  }

  _getSubjectList(page) {
    this.props.dispatch(getSubject({page}));
  }

  _onEndReached(info) {
    // console.log('info', info);
    if (info.distanceFromEnd > 0) {
      let { subject } = this.props;
      let dataPage = subject.page + 1;
      if (dataPage <= subject.maxPage) {
        this._getSubjectList(dataPage);
      }
    }
  }
  _onRefresh() {
    this._getSubjectList(1);
  }

  _searchButtonCallback() {

  }

  _onPressAdd() {
    let {router} = this.props;
    router.toEditSubject();
  }
  _onPressItem(item) {
    let {router} = this.props;
    router.toSubjectDetails(item);
  }
  render() {
    let {subject = {}, refreshing, loadedData} = this.props;
    let { page, maxPage, list = [] } = subject;
    return (
      <View style={styles.container}>
        <NavBar
          title='专题'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
          rightText='新建'
          rightPress={this._onPressAdd.bind(this)}
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
            return (<ItemSubject swipeActions={[
              {
                text: '编辑',
                backgroundColor: '#c1c0c6',
                onPress: this._onPressEditSubject.bind(this, itemData.item),
              },
              {
                text: '删除',
                backgroundColor: '#d9534f',
                onPress: this._onPressDelSubject.bind(this, itemData.item),
              },
            ]} onPress={this._onPressItem} itemData={itemData} />);
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          ListEmptyComponent={() => { return (<EmptyData msg='还木有创建专题~' />); }}
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

Subject.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  subject: PropTypes.object,
};
const select = (state = {}) => {
  let {subject, subjectUI} = state;
  return {...subject, ...subjectUI};
};
export default connect(select)(Subject);
