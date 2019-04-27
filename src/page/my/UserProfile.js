import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { imagePickerOptions } from '../../constants';
import NavBar from '../../component/NavBar';
import Item from '../../component/ItemButton';
import {parseImgUrl} from '../../util/index';
import * as fileService from '../../services/fileService';
import { getUserInfo } from '../../actions/user';
import * as userService from '../../services/user';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImgSource: null,
    };
  }
  back() {
    let {router} = this.props;
    router.pop();
  }

  _onPressUserImg() {
    ImagePicker.showImagePicker({ ...imagePickerOptions, allowsEditing: true }, async (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          userImgSource: source,
        });
        let upload = await fileService.upload([{...source, key: 'userImg'}]);
        await userService.modifyUserInfo({userExt: {userImg: upload.userImg.multimediaOriginal}});
        this.props.dispatch(getUserInfo);
      }
    });
  }

  render() {
    let {user = {}} = this.props;
    let {userExt = {}, thirdUserList} = user;
    let thirdAuth = {};
    thirdUserList.forEach(function (item) {
      thirdAuth[item.source] = item;
    });
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title='账户信息'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Item name='头像' avatar={this.state.userImgSource || parseImgUrl(userExt.userImg)} first onPress={this._onPressUserImg.bind(this)} />
          <Item name='昵称' subName={userExt.nickname} onPress={() => this.props.router.toEditUserInfo()} />
          <Text style={styles.title}>{'账号绑定'}</Text>
          <Item name='手机' disable font='FontAwesome' icon='mobile' subName={user.mobile || '暂无信息'} />
          {/* <Item name='微信' color='#1bce4a' iconSize={15} font='FontAwesome' icon='wechat' subName={thirdAuth[0] ? '已绑定' : '未绑定'} /> */}
          {/* <Item name='QQ' color='#ce3c1b' iconSize={15} font='FontAwesome' icon='qq' subName={thirdAuth[1] ? '已绑定' : '未绑定'} /> */}
          {/* <Item name='微博' color='#fa7d3c' iconSize={16} font='FontAwesome' icon='weibo' subName={thirdAuth[2] ? '已绑定' : '未绑定'} /> */}
          <Item name='GitHub' color='#24292e' iconSize={16} font='FontAwesome' icon='github' subName={thirdAuth[3] ? '已绑定' : '未绑定'} />
          <Text style={styles.title}>{'安全设置'}</Text>
          <Item name='修改密码' onPress={() => { this.props.router.toEditPassword(); }} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#666',
  },
});

UserProfile.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.object,
  user: PropTypes.object,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};
export default connect(select)(UserProfile);
