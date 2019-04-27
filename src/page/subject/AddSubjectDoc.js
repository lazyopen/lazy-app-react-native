import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import ItemSubject from '../../component/ItemSubject';
import FooterLoading from '../../component/base/FooterLoading';
import EmptyData from '../../component/base/EmptyData';
import { getSubject, addSubjectDoc, delSubjectDoc } from '../../actions/subject';
import theme from '../../config/theme';
import { getDocSubject } from '../../actions/doc';

class AddSubjectDoc extends Component {
  constructor(props) {
    super(props);
    this._getSubjectList = this._getSubjectList.bind(this);
    this._submitSubjectDoc = this._submitSubjectDoc.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }
  componentDidMount() {
    let {subject = {}, dispatch, docId} = this.props;
    if (subject.list.length === 0) {
      this._getSubjectList(1);
    }
    dispatch(getDocSubject({docId}));
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
            dispatch(delSubjectDoc(item));
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
  _submitSubjectDoc(itemData, add) {
    let {dispatch} = this.props;
    // add : false 收入 true 移除
    let {docId, item} = itemData;
    dispatch(add ? delSubjectDoc({docId, subjectId: item.id}) : addSubjectDoc({docId, subjectId: item.id}));
  }

  _renderItem(itemData) {
    let {subjectDoc, docId} = this.props;
    return (<ItemSubject viewType='addDoc' onPress={this._submitSubjectDoc} itemData={{...itemData, subjectDoc, docId}} />);
  }

  render() {
    let {subject = {}, refreshing, loadedData} = this.props;
    let { page, maxPage, list = [] } = subject;
    return (
      <View style={styles.container}>
        <NavBar
          title='收入专题'
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
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => { return (<FooterLoading endMsg={'- End -'} noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
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

AddSubjectDoc.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  subjectDoc: PropTypes.array,
  docId: PropTypes.any,
  subject: PropTypes.object,
};
const select = (state = {}) => {
  let {subject, subjectUI, doc} = state;
  return {...subject, ...subjectUI, ...doc};
};
export default connect(select)(AddSubjectDoc);
