import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, Dimensions} from 'react-native';

class EmptyData extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    let { marginTop = (Dimensions.get('window').height) / 3, msg = '这里还木有内容哦~' } = this.props;
    return (
      <View style={{marginTop, justifyContent: 'center', padding: 8, alignItems: 'center', flexDirection: 'column'}}>
        <Image style={{width: 60, height: 60}} source={require('../../image/empty_data.png')} />
        <Text style={{color: '#999', fontSize: 12, marginTop: 5}} >{msg}</Text>
      </View>
    );
  }
}
EmptyData.propTypes = {
  marginTop: PropTypes.any,
  msg: PropTypes.any,
};
export default EmptyData;
