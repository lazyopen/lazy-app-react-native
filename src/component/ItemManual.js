import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp, {parseImgUrl} from '../util/index';
import {ListRow} from 'teaset';
import theme from '../config/theme';

export default class ItemManual extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem() {
    let {itemData, viewType, onPress, onPressActions = []} = this.props;
    let {manualName, manualImg, downloaded} = itemData.item;
    return (
      <ListRow
        onPress={onPress}
        title={manualName}
        titleStyle={{color: theme.grayTextColor, fontSize: 12}}
        // detail={manualName}
        titlePlace='top'
        icon={parseImgUrl(manualImg)}
        accessory={viewType === 'download'
          ? <Icon name={downloaded ? 'ios-trash-outline' : 'ios-download-outline'} color='#007bff' size={22} />
          : 'indicator'
        }
      />
    );
  }

  render() {
    return this._renderItem();
  }
}

ItemManual.propTypes = {
  onPressActions: PropTypes.any,
  viewType: PropTypes.any,
  onPress: PropTypes.any,
  itemData: PropTypes.object,
};

const styles = StyleSheet.create({

});
