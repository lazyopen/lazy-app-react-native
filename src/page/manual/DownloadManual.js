import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, PixelRatio, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Toast, Theme } from 'teaset';
import NavBar from '../../component/NavBar';
import { getApiManualList, downApiManual, delApiManual } from '../../actions/home';
import ItemManual from '../../component/ItemManual';

class DownloadManual extends Component {
  constructor(props) {
    super(props);
    this._onPressItem = this._onPressItem.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getApiManualList());
  }
  back() {
    this.props.router.pop();
  }
  _update() {
    Toast.show({
      text: '正在更新...',
      icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
    });
  }

  _onPressItem(itemData) {
    let {dispatch} = this.props;
    let {item} = itemData;
    item.downloaded ? dispatch(delApiManual(item)) : dispatch(downApiManual(item.id));
  }

  render() {
    let {manual = []} = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          style={{
            backgroundColor: '#ffffff',
            borderBottomColor: '#d5d5d5',
            borderBottomWidth: 1 / PixelRatio.get(),
          }}
          title='下载'
          titleStyle={{color: '#000000'}}
          leftColor='#007aff'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
          rightColor='#007aff'
          rightIcon='ios-sync-outline'
          rightPress={this._update.bind(this)}
        />
        <FlatList
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          style={styles.listView}
          data={manual}
          renderItem={(itemData) => { return (<ItemManual onPress={this._onPressItem.bind(this, itemData)} viewType='download' itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
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

DownloadManual.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  downManual: PropTypes.any,
  manual: PropTypes.any,
};
const select = (state = {}) => {
  let {home, homeUI} = state;
  return {...home, ...homeUI};
};
export default connect(select)(DownloadManual);
