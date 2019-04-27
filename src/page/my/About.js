import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import theme from '../../config/theme';

class About extends Component {
  constructor(props) {
    super(props);
  }
  back() {
    this.props.router.pop();
  }

  _onPressEmail() {
    let url = 'mailto:lazy_cheng@qq.com';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NavBar
          title='联系反馈'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView style={{padding: theme.globalPadding}}>
          <Text style={styles.text}>你可以随时联系我。我喜欢收到来自用户的反馈!</Text>
          <TouchableOpacity
            onPress={this._onPressEmail.bind(this)}
            activeOpacity={theme.btnActiveOpacity} >
            <Text style={styles.email}>email: lazy_cheng@qq.com</Text>
          </TouchableOpacity>
          <Text style={styles.text}>我通常的回答时间少于24小时。如果我在网上，当你给我发邮件的时候(这经常发生)，我会立刻回复。</Text>
        </ScrollView>
      </View>
    );
  }
}

About.propTypes = {
  router: PropTypes.object,
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 30,
  },
  email: {
    color: '#21a8e1',
    lineHeight: 30,
    fontSize: 18,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f2fafd',
  },
});
export default connect()(About);
