import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Toast, ModalIndicator, Menu } from 'teaset';
import px2dp, {parseImgUrl} from '../../util';
import { MarkdownEditor } from '../../component/markdown';
import DashLine from '../../component/base/DashLine';
import NavBar from '../../component/NavBar';
import * as userService from '../../services/user';
import * as fileService from '../../services/fileService';
import { getUserDoc } from '../../actions/user';
import { imagePickerOptions } from '../../constants';

class EditDoc extends Component {
  constructor(props) {
    super(props);
    let {editObj} = this.props;
    console.log(this.props);
    this.state = {
      coverSource: null,
      files: [],
      title: '',
      coverImg: '',
      docTxt: {
        txt: '',
      },
    };
    if (editObj) {
      let {coverImg, title, docTxt, id} = editObj;
      this.state = {
        files: [],
        coverSource: parseImgUrl(coverImg),
        title,
        docTxt,
        id,
      };
    }
    this.submit = this.submit.bind(this);
    this.back = this.back.bind(this);
  }
  componentDidMount() {
  }
  async submit(status) {
    let { docTxt, title, files } = this.state;
    if (docTxt.txt == null || docTxt.txt === '') {
      return Toast.sad('写点什么吧');
    }
    let {dispatch, router, editObj} = this.props;
    ModalIndicator.show('正在发布...');
    let dto = {
      docTxt,
      title,
      status: status,
    };
    // 上传封面图片文件
    if (files.length > 0) {
      let uploadCover = await fileService.upload(files);
      dto.coverImg = uploadCover.cover.multimediaOriginal;
      console.log('uploadCover', uploadCover);
    }
    let handle = null;
    if (editObj) {
      dto.id = editObj.id;
      handle = await userService.modifyUserDoc(dto);
      dispatch(getUserDoc({docViewType: 1, page: 1}));
      if (handle) {
        ModalIndicator.hide();
        dispatch(getUserDoc({docViewType: 1, page: 1}));
        router.pop();
        Toast.info('修改成功', 1500);
      }
    } else {
      handle = await userService.addUserDoc(dto);
      if (handle) {
        ModalIndicator.hide();
        dispatch(getUserDoc({docViewType: 1, page: 1}));
        router.pop();
        Toast.info('发布成功', 1500);
        setTimeout(function () {
          status === 0 ? router.toDraftDoc() : router.toMyDoc();
        }, 1500);
      }
    }
  }

  showSetting(view) {
    view.measureInWindow((x, y, width, height) => {
      let items = [
        {title: '保存草稿', icon: require('../../image/edit.png'), onPress: () => this.submit(0)},
        {title: '放弃编辑', icon: require('../../image/trash.png'), onPress: () => this.back()},
      ];
      Menu.show({x, y, width, height}, items, {align: 'end', direction: 'up', showArrow: true, alignInsets: -5});
    });
  }

  back() {
    this.props.router.pop();
  }

  _onPressCover() {
    ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          coverSource: source,
          files: [{...source, key: 'cover'}],
        });
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title={this.props.title}
          rightText={'发布'}
          leftIcon='md-close'
          leftColor='#8a8a8a'
          rightColor='#eb6f5a'
          leftPress={this.back}
          rightPress={() => this.submit(2)}
          style={{backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#d5d5d5'}}
        />
        <View style={{paddingHorizontal: px2dp(7), backgroundColor: '#fff', flexDirection: 'row'}}>
          <View style={{flex: 70}}>
            <TextInput
              onChangeText={(title) => this.setState({title})}
              returnKeyType='done'
              value={this.state.title}
              underlineColorAndroid='transparent'
              autoCapitalize={'none'}
              ref={'name'}
              style={styles.titleInput}
              placeholder='请输入标题'
              placeholderTextColor='#aaa' />
          </View>
          <View style={{flex: 30, flexDirection: 'row'}}>
            <Text style={{color: '#d5d5d5', marginTop: px2dp(16)}}>设置封面></Text>
            <TouchableOpacity onPress={this._onPressCover.bind(this)}>
              <Image source={this.state.coverSource || require('../../image/upload.png')} style={styles.uploadCover} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingBottom: px2dp(5), backgroundColor: '#fff'}}>
          <DashLine />
        </View>
        <MarkdownEditor
          text={this.props.editObj ? this.props.editObj.docTxt.txt : ''}
          onSettingPress={this.showSetting.bind(this)}
          onMarkdownChange={(txt) => { this.setState({docTxt: {txt}}); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    paddingTop: px2dp(10),
    backgroundColor: '#fff',
    fontSize: px2dp(20),
  },
  uploadCover: {
    width: px2dp(35),
    height: px2dp(35),
    marginTop: px2dp(5),
    borderRadius: px2dp(10),
  },
});

EditDoc.propTypes = {
  router: PropTypes.object,
  docTxt: PropTypes.object,
  title: PropTypes.string,
  editObj: PropTypes.any,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};

export default connect(select)(EditDoc);
