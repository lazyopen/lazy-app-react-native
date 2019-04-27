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
import { getUserInfo } from '../../actions/user';
import * as userService from '../../services/user';

class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    let {user = {}} = this.props;
    let {nickname} = user.userExt;
    this.state = {
      nickname,
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
  }
  async submit() {
    let {nickname} = this.state;
    if (nickname == null || nickname === '') {
      return Toast.info('请输入昵称');
    }
    const handle = await userService.modifyUserInfo({ userExt: {nickname} });
    if (handle) {
      let {dispatch, router} = this.props;
      Toast.info('信息修改成功', 1500);
      dispatch(getUserInfo());
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
          title='修改信息'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <View style={{marginTop: 10, backgroundColor: '#fff', paddingLeft: 16}}>
            <View style={styles.item}>
              <Text style={styles.label}>{'昵称'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(nickname) => this.setState({nickname})}
                  returnKeyType='done'
                  onSubmitEditing={this.submit}
                  underlineColorAndroid='transparent'
                  autoCapitalize={'none'}
                  value={this.state.nickname}
                  style={styles.textInput}
                  placeholder='请输入昵称'
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

EditUserInfo.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.any,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};

export default connect(select)(EditUserInfo);
