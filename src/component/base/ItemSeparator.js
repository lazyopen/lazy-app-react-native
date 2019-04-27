import React, {Component} from 'react';
import {View, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';

class ItemSeparator extends Component {
  render () {
    let {style = {}} = this.props;
    let wrapperStyle = {
      borderTopColor: '#d5d5d5',
      borderTopWidth: 1 / PixelRatio.get(),
    };
    return (
      <View style={[wrapperStyle, style]} />
    );
  }
}
ItemSeparator.propTypes = {
  style: PropTypes.object,
};
export default ItemSeparator;
