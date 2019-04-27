import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, PixelRatio, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import { getApiManualList, downApiManual, delApiManual } from '../../actions/home';
import ItemManualDirectory from '../../component/ItemManualDirectory';

class DirectoryManual extends Component {
  constructor(props) {
    super(props);
    this._onPressItem = this._onPressItem.bind(this);
  }
  componentDidMount() {
  }
  back() {
    this.props.router.pop();
  }
  _onPressItem(itemData) {
    let {obj, children} = itemData.item;
    let {router} = this.props;
    if (children.length > 0) {
      router.toDirectoryManual({apiDirectoryTree: children, title: obj.directoryName});
    } else {
      router.toDirectoryContent(obj);
    }
  }

  render() {
    let {apiDirectoryTree = [], title} = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          style={{
            backgroundColor: '#ffffff',
            borderBottomColor: '#d5d5d5',
            borderBottomWidth: 1 / PixelRatio.get(),
          }}
          title={title}
          titleStyle={{color: '#000000'}}
          leftColor='#007aff'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <FlatList
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          style={styles.listView}
          data={apiDirectoryTree}
          renderItem={(itemData) => { return (<ItemManualDirectory onPress={this._onPressItem.bind(this, itemData)} viewType='download' itemData={itemData} />); }}
          keyExtractor={(item) => item.obj.id}
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

DirectoryManual.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  apiDirectoryTree: PropTypes.any,
};
const select = (state = {}) => {
  let {home, homeUI} = state;
  return {...home, ...homeUI};
};
export default connect(select)(DirectoryManual);
