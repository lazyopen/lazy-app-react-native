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
import DashLine from '../../component/base/DashLine';
import NavBar from '../../component/NavBar';
import * as subjectService from '../../services/subjectService';
import * as fileService from '../../services/fileService';
import { getSubject } from '../../actions/subject';
import { imagePickerOptions } from '../../constants';
import theme from '../../config/theme';

class EditSubject extends Component {
  constructor(props) {
    super(props);
    let {editObj} = this.props;
    console.log(this.props);
    this.state = {
      coverSource: null,
      files: [],
      subjectName: '',
      subjectDesc: '',
    };
    if (editObj) {
      let {subjectName, subjectDesc, subjectCover, id} = editObj;
      this.state = {
        files: [],
        coverSource: parseImgUrl(subjectCover),
        subjectName,
        subjectDesc,
        id,
      };
    }
    this.submit = this.submit.bind(this);
    this.back = this.back.bind(this);
  }
  componentDidMount() {
  }
  async submit() {
    let { subjectName, subjectDesc, files } = this.state;
    let {dispatch, router, editObj} = this.props;
    if (subjectName == null || subjectName === '') {
      return Toast.sad('请输入专题名称');
    }
    if (subjectDesc == null || subjectDesc === '') {
      return Toast.sad('请输入专题描述');
    }
    if (files.length <= 0 && !editObj) {
      return Toast.sad('请选择专题图片');
    }
    ModalIndicator.show('正在处理...');
    let dto = {
      subjectName,
      subjectDesc,
    };
    // 上传封面图片文件
    if (files.length > 0) {
      let uploadCover = await fileService.upload(files);
      dto.subjectCover = uploadCover.cover.multimediaOriginal;
    }
    let handle = null;
    if (editObj) {
      dto.id = editObj.id;
      handle = await subjectService.modifySubject(dto);
      dispatch(getSubject({page: 1}));
      if (handle) {
        ModalIndicator.hide();
        dispatch(getSubject({page: 1}));
        Toast.info('修改成功', 1500);
        router.pop();
      }
    } else {
      handle = await subjectService.addSubject(dto);
      if (handle) {
        ModalIndicator.hide();
        dispatch(getSubject({page: 1}));
        Toast.info('新建成功', 1500);
        router.pop();
      }
    }
  }
  showSetting(view) {
    view.measureInWindow((x, y, width, height) => {
      let items = [
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NavBar
          title={'新建专题'}
          rightText={'完成'}
          leftIcon='md-close'
          leftColor='#8a8a8a'
          rightColor='#eb6f5a'
          leftPress={this.back}
          rightPress={() => this.submit(2)}
          style={{backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#d5d5d5'}}
        />
        <View style={{paddingHorizontal: px2dp(7), flexDirection: 'row'}}>
          <View style={{flex: 70}}>
            <TextInput
              onChangeText={(subjectName) => this.setState({subjectName})}
              returnKeyType='next'
              value={this.state.subjectName}
              underlineColorAndroid='transparent'
              autoCapitalize={'none'}
              ref={'subjectName'}
              style={styles.titleInput}
              placeholder='专题名称'
              maxLength={50}
              placeholderTextColor='#aaa' />
          </View>
          <View style={{flex: 30, flexDirection: 'row'}}>
            <Text style={{color: '#d5d5d5', marginTop: px2dp(16)}}>专题图片></Text>
            <TouchableOpacity onPress={this._onPressCover.bind(this)}>
              <Image source={this.state.coverSource || require('../../image/upload.png')} style={styles.uploadCover} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingBottom: px2dp(5), backgroundColor: '#fff'}}>
          <DashLine />
        </View>
        <View style={{paddingHorizontal: px2dp(7), flexDirection: 'row'}}>
          <TextInput
            onChangeText={(subjectDesc) => this.setState({subjectDesc})}
            multiline
            value={this.state.subjectDesc}
            underlineColorAndroid='transparent'
            autoCapitalize={'none'}
            ref={'subjectDesc'}
            style={[styles.titleInput, {height: theme.screenHeight / 2, width: theme.screenWidth}]}
            placeholder='为专题添加适当的描述'
            placeholderTextColor='#aaa' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    paddingTop: px2dp(10),
    backgroundColor: '#fff',
    fontSize: px2dp(16),
  },
  uploadCover: {
    width: px2dp(35),
    height: px2dp(35),
    marginTop: px2dp(5),
    borderRadius: px2dp(10),
  },
});

EditSubject.propTypes = {
  router: PropTypes.object,
  title: PropTypes.string,
  editObj: PropTypes.any,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};

export default connect(select)(EditSubject);
