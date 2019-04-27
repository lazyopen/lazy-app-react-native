import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp, {parseImgUrl} from '../util/index';
import {ListRow} from 'teaset';
import theme from '../config/theme';

export default class ItemManualDirectory extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem() {
    let {itemData, onPress, onPressActions = []} = this.props;
    let {obj, children} = itemData.item;
    return (
      <ListRow
        onPress={onPress}
        title={obj.directoryName}
        titleStyle={{color: theme.grayTextColor, fontSize: 12}}
        detail={children.length > 0 ? children.length : ''}
        accessory={'indicator'}
      />
    );
  }

  render() {
    return this._renderItem();
  }
}

ItemManualDirectory.propTypes = {
  onPressActions: PropTypes.any,
  viewType: PropTypes.any,
  onPress: PropTypes.any,
  itemData: PropTypes.object,
};

const styles = StyleSheet.create({

});
