import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar';
import Item from '../../component/ItemButton';
import { logout } from '../../actions/user';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.loginOut = this.loginOut.bind(this);
  }
  back() {
    this.props.router.pop();
  }
  goProfile() {
    this.props.router.toUserProfile();
  }
  loginOut() {
    Alert.alert(
      '安全退出',
      '',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确定',
          onPress: () => {
            this.props.dispatch(logout());
            this.props.router.resetToSignIn();
          } },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title='设置'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Item name='账户安全' first onPress={this.goProfile.bind(this)} />
          {/* <Item name='通用' /> */}
          <Item name='关于我们' first onPress={() => this.props.router.toAbout()} />
          <Item.Button name='退出登录' first onPress={this.loginOut} />
        </ScrollView>
      </View>
    );
  }
}

Setting.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(Setting);
