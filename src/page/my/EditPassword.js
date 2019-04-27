import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'teaset';
import px2dp from '../../util';
import NavBar from '../../component/NavBar';
import Button from '../../component/Button';
import MD5 from '../../util/md5';
import { modifyUserPassword } from '../../actions/user';
import * as userService from '../../services/user';

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
  }
  async submit() {
    let { oldPassword, newPassword, confirmPassword } = this.state;

    if (oldPassword == null || oldPassword === '') {
      return Toast.info('请输入旧密码', 1);
    }
    if (newPassword == null || newPassword === '') {
      return Toast.info('请输入新密码', 1);
    }
    if (newPassword.length < 4) {
      return Toast.info('新密码长度不能小于4位', 1);
    }
    if (confirmPassword == null || confirmPassword === '') {
      return Toast.info('请输入确认密码', 1);
    }
    if (confirmPassword !== newPassword) {
      return Toast.info('两次密码输入不一致', 1);
    }
    if (oldPassword.length < 4) {
      return Toast.info('原密码错误', 1);
    }
    const handle = await userService.modifyUserPassword({
      oldPassword: MD5(oldPassword),
      newPassword: MD5(newPassword),
    });
    if (handle) {
      let {router} = this.props;
      Toast.info('密码修改成功', 1500);
      setTimeout(function () {
        router.pop();
      }, 1500);
    }
  }
  back() {
    this.props.router.pop();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title='修改密码'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <View style={{marginTop: 10, backgroundColor: '#fff', paddingLeft: 16}}>
            <View style={styles.item}>
              <Text style={styles.label}>{'旧密码'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(oldPassword) => this.setState({oldPassword})}
                  returnKeyType='next'
                  onSubmitEditing={() => { this.refs.newPassword.focus(); }}
                  underlineColorAndroid='transparent'
                  autoCapitalize={'none'}
                  style={styles.textInput}
                  placeholder='请输入旧密码'
                  secureTextEntry
                  placeholderTextColor='#aaa' />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{'新密码'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(newPassword) => this.setState({newPassword})}
                  returnKeyType='next'
                  onSubmitEditing={() => { this.refs.confirmPassword.focus(); }}
                  ref='newPassword'
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  placeholder='请输入新密码'
                  secureTextEntry
                  placeholderTextColor='#aaa' />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{'确认密码'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                  returnKeyType='done'
                  onSubmitEditing={this.submit}
                  ref='confirmPassword'
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  placeholder='请输入确认密码'
                  secureTextEntry
                  placeholderTextColor='#aaa' />
              </View>
            </View>
          </View>
          <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: 'hidden'}} onPress={this.submit}>
            <View style={{flex: 1, height: 40, backgroundColor: '#56d176', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>{'确定'}</Text>
            </View>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    minWidth: 55,
    fontSize: px2dp(13),
    color: '#222',
    paddingTop: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    height: 30,
    fontSize: 13,
    paddingHorizontal: 10,
  },
});

EditPassword.propTypes = {
  router: PropTypes.object,
  // dispatch: PropTypes.func,
  // user: PropTypes.any,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};

export default connect(select)(EditPassword);
