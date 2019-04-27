import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, PixelRatio, Platform, Image, TextInput, BackHandler, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Toast, ModalIndicator } from 'teaset';
import Button from '../../component/AuthButton';
import TextButton from '../../component/TextButton';
import ImageButton from '../../component/ImageButtonWithText';
import TextDivider from '../../component/TextDivider';
import px2dp from '../../util/index';
import regExp from '../../util/regExp';
import MD5 from '../../util/md5';
import { login } from '../../actions/user';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../config/theme';
import { getHomeConfig } from '../../actions/home';

class SignIn extends Component {
  constructor (props) {
    super(props);
    this.state = { isLoading: false };
    this._handleBack = this._handleBack.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._onPressGitHubLogin = this._onPressGitHubLogin.bind(this);
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
  }

  shouldComponentUpdate(nextProps) {
    // console.log('SignIn nextProps', nextProps);
    // console.log('SignIn nextState', nextState);
    let {token} = nextProps;
    if (token && this.props.token !== token) {
      this.props.dispatch(getHomeConfig());
      this.props.router.resetToMain();
      return false;
    }
    return true;
  }

  _handleBack () {
    BackHandler.exitApp();
  }
  _signUpCallback () {
    this.props.router.toSignUp();
  }

  _forgetPassword () {
    this.props.router.toForgetPassword();
  }

  _handleLogin () {
    let {username, password} = this;
    // username = '18679850957';
    // password = '999999';
    if (username == null || username === '') {
      return Toast.info('请输入手机号码', 1500);
    }
    if (regExp('mobile', username)) {
      return Toast.info('请输入正确的手机号码', 1500);
    }
    if (password == null || password === '') {
      return Toast.info('请输入密码', 1500);
    }
    if (password.length < 4) {
      return Toast.info('输入的密码有误', 1500);
    }
    let {dispatch} = this.props;
    Keyboard.dismiss();
    ModalIndicator.show('正在登录...');
    dispatch(login({username, password: MD5(password), roleType: 1}));
  }

  _onPressWeiBo () {
    Toast.message('暂不支持，试试GitHub登录吧~');
  }
  _onPressGitHubLogin () {
    this.props.router.toGitHubLogin();
  }

  render () {
    return (
      <View style={styles.view}>
        <View style={[styles.actionBar, {height: px2dp(60)}]}>
          {/* <ImageButton */}
          {/* onPress={this._handleBack} */}
          {/* icon='md-arrow-back' */}
          {/* color='white' */}
          {/* imgSize={px2dp(25)} */}
          {/* btnStyle={{width: px2dp(55), height: px2dp(60)}} */}
          {/* /> */}
        </View>
        <View style={styles.logo}>
          <Image style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            width: px2dp(45),
            height: px2dp(45)}} source={require('../../image/ic_login_logo.png')} />
        </View>
        <View style={styles.editGroup}>
          <View style={styles.editView1}>
            <Icon name='ios-phone-portrait' size={px2dp(20)} color='#999' style={{marginTop: px2dp(10), marginLeft: px2dp(5)}} />
            <TextInput
              keyboardType='numeric'
              returnKeyType='next'
              onSubmitEditing={() => { this.refs.password.focus(); }}
              onChangeText={(username) => this.username = username}
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.edit}
              underlineColorAndroid='transparent'
              placeholder='手机号'
              placeholderTextColor='#c4c4c4' />
          </View>
          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4'}} />
          <View style={styles.editView2}>
            <Icon name='ios-lock' size={px2dp(20)} color='#999' style={{marginTop: px2dp(10), marginLeft: px2dp(5)}} />
            <TextInput
              returnKeyType='done'
              onSubmitEditing={this._handleLogin}
              ref='password'
              onChangeText={(password) => this.password = password}
              style={styles.edit}
              underlineColorAndroid='transparent'
              placeholder='密码'
              secureTextEntry
              placeholderTextColor='#c4c4c4' />
          </View>
          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4'}} />
          <View style={{marginTop: px2dp(10), height: px2dp(40)}}>
            <Button text='登录' onPress={this._handleLogin} />
          </View>
          <View style={styles.textButtonLine}>
            <TextButton text='忘记密码?' onPress={this._forgetPassword.bind(this)} />
            <TextButton text='注册账号' onPress={this._signUpCallback.bind(this)} />
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: px2dp(20), marginRight: px2dp(20)}}>
            <TextDivider text='其他账号登录' />
          </View>
          <View style={styles.thirdPartyView}>
            {/* <ImageButton onPress={this._onPressWeiBo} text='微博' image={require('../../image/weibo_login.png')} color='rgba(201,201,206,0.9)' /> */}
            {/* <ImageButton onPress={this._onPressWeiBo} text='微信' image={require('../../image/wechat_login.png')} color='rgba(201,201,206,0.9)' /> */}
            <ImageButton onPress={this._onPressGitHubLogin} text='Github' image={require('../../image/github_login.png')} color='rgba(201,201,206,0.9)' />
          </View>
        </View>
      </View>
    );
  }
}

SignIn.propTypes = {
  router: PropTypes.object,
  token: PropTypes.string,
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionBar: {
    marginTop: (Platform.OS === 'ios') ? px2dp(10) : 0,
  },
  logo: {
    alignItems: 'center',
    marginTop: px2dp(40),
  },
  edit: {
    width: theme.screenWidth - 50,
    height: px2dp(40),
    fontSize: px2dp(13),
    backgroundColor: '#fff',
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15),
  },
  editView1: {
    flexDirection: 'row',
    height: px2dp(40),
    backgroundColor: 'white',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  editView2: {
    flexDirection: 'row',
    height: px2dp(40),
    backgroundColor: 'white',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  editGroup: {
    margin: px2dp(20),
  },
  textButtonLine: {
    marginTop: px2dp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thirdPartyView: {
    flex: 1,
    marginTop: px2dp(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

});

const select = (state = {}) => {
  let {user, userUI} = state;
  return {...user, ...userUI};
};
export default connect(select)(SignIn);
