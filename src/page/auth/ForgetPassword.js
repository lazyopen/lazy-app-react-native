import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, StyleSheet, PixelRatio, Platform, TextInput, BackHandler, Text, Keyboard,
  TouchableOpacity,
} from 'react-native';
import { Toast, ModalIndicator } from 'teaset';
import ImageButton from '../../component/ImageButtonWithText';
import Button from '../../component/AuthButton';
import px2dp from '../../util/index';
import MD5 from '../../util/md5';
import regExp from '../../util/regExp';
import { sendCode, resetPwd } from '../../services/user';

class ForgetPassword extends Component {
  constructor (props) {
    super(props);
    this.state = {
      codeText: '获取验证码',
      codeTime: 0,
    };
    this._handleBack = this._handleBack.bind(this);
    this._getCode = this._getCode.bind(this);
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount () {
    clearInterval(this.codeInterval);
    BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
  }

  _handleBack () {
    this.props.router.pop();
  }

  async _resetPassword () {
    let {username, password, code} = this;
    if (username == null || username === '') {
      return Toast.info('请输入手机号码', 1500);
    }
    if (regExp('mobile', username)) {
      return Toast.info('请输入正确的手机号码', 1500);
    }
    if (code == null || code === '') {
      return Toast.info('请输入验证码', 1500);
    }
    if (password == null || password === '') {
      return Toast.info('请输入重置密码', 1500);
    }
    if (password.length < 4) {
      return Toast.info('密码长度不能小于4位', 1500);
    }
    Keyboard.dismiss();
    ModalIndicator.show('正在重置...');
    let handle = await resetPwd({username, password: MD5(password), code});
    if (handle) {
      Toast.info('密码已重置', 1500);
      setTimeout(() => {
        this.props.router.pop();
      }, 1500);
    }
  }
  async _getCode () {
    let {username} = this;
    if (username == null || username === '') {
      return Toast.info('请输入手机号码', 1500);
    }
    if (regExp('mobile', username)) {
      return Toast.info('请输入正确的手机号码', 1500);
    }
    let handle = await sendCode({phone: username, smsId: 'SMS_118750014'});
    if (handle) {
      this.setState({codeTime: 60, codeText: '重新获取(60s)'});
      this.codeInterval = setInterval(() => {
        let {codeTime} = this.state;
        if (codeTime === 0) {
          clearInterval(this.codeInterval);
          this.setState({codeTime: 0, codeText: '获取验证码'});
        } else {
          --codeTime;
          this.setState({codeTime, codeText: '重新获取(' + codeTime + 's)'});
        }
      }, 1000);
    }
  }

  render () {
    return (
      <View style={styles.view}>
        <View style={styles.actionBar}>
          <ImageButton
            onPress={this._handleBack.bind(this)}
            icon='md-arrow-back'
            color='white'
            imgSize={px2dp(25)}
            btnStyle={{width: px2dp(55), height: px2dp(60)}}
          />
        </View>
        <View style={styles.editGroup}>
          <View style={styles.editView1}>
            <TextInput
              keyboardType='numeric'
              onChangeText={(username) => this.username = username}
              returnKeyType='next'
              onSubmitEditing={() => { this.refs.code.focus(); }}
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.edit}
              underlineColorAndroid='transparent'
              placeholder='手机号'
              placeholderTextColor='#c4c4c4' />
          </View>
          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4'}} />
          <View style={styles.editView2}>
            <TextInput
              keyboardType='numeric'
              ref='code'
              returnKeyType='next'
              onSubmitEditing={() => { this.refs.password.focus(); }}
              onChangeText={(code) => this.code = code}
              style={styles.edit}
              underlineColorAndroid='transparent'
              placeholder='验证码'
              placeholderTextColor='#c4c4c4' />
            <TouchableOpacity onPress={this._getCode} disabled={this.state.codeTime > 0}>
              <Text style={styles.codeBtn}>{this.state.codeText}</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4'}} />
          <View style={styles.editView3}>
            <TextInput
              onChangeText={(password) => this.password = password}
              returnKeyType='done'
              onSubmitEditing={this._signUpCallback}
              ref='password'
              style={styles.edit}
              secureTextEntry
              underlineColorAndroid='transparent'
              placeholder='重置密码'
              placeholderTextColor='#c4c4c4' />
          </View>

          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4'}} />
          <View style={{marginTop: px2dp(15), height: px2dp(40)}}>
            <Button text='重置密码' onPress={this._resetPassword.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

ForgetPassword.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'rgb(22,131,251)',
  },
  actionBar: {
    marginTop: (Platform.OS === 'ios') ? px2dp(10) : 0,
  },
  editGroup: {
    padding: px2dp(20),
  },
  edit: {
    height: px2dp(40),
    fontSize: px2dp(13),
    backgroundColor: 'white',
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15),
  },
  editView1: {
    height: px2dp(48),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  editView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    height: px2dp(48),
    backgroundColor: 'white',
  },
  editView3: {
    height: px2dp(48),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  codeBtn: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#c4c4c4',
    color: '#c4c4c4',
    padding: 5,
    marginRight: px2dp(10),
    borderRadius: 5,
  },
});

const select = (state = {}) => {
  let {user} = state;
  return user;
};
export default connect(select)(ForgetPassword);
