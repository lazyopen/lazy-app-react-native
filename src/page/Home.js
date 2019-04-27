import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../component/NavBar';
import EmptyData from '../component/base/EmptyData';
import theme from '../config/theme';
import ItemManual from '../component/ItemManual';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  _download() {
    this.props.router.toDownloadManual();
  }
  _onPressItem(itemData) {
    let {apiDirectoryTree, manualName} = itemData.item;
    this.props.router.toDirectoryManual({apiDirectoryTree, title: manualName});
  }
  render() {
    let {downManual = []} = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          style={{
            backgroundColor: '#ffffff',
            borderBottomColor: '#d5d5d5',
            borderBottomWidth: 1 / PixelRatio.get(),
          }}
          title='API手册'
          titleStyle={{color: '#000000'}}
          rightColor='#007aff'
          rightIcon='ios-cloud-download-outline'
          rightPress={this._download.bind(this)}
        />
        <FlatList
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          style={styles.listView}
          data={downManual}
          renderItem={(itemData) => { return (<ItemManual onPress={this._onPressItem.bind(this, itemData)} itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => { return (<EmptyData msg={'还没有下载API手册'} />); }}
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

Home.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  downManual: PropTypes.any,
};
const select = (state = {}) => {
  let {home, homeUI} = state;
  return {...home, ...homeUI};
};
export default connect(select)(Home);
