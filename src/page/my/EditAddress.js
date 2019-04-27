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
import regExp from '../../util/regExp';
import { getUserAddress } from '../../actions/user';
import * as userService from '../../services/user';

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      number: '',
      tag: null,
      sex: null,
    };
  }
  componentDidMount() {
    if (this.props.pageType === 1) {
      let obj = {};
      ['id', 'name', 'phone', 'tag', 'sex', 'address', 'number'].forEach((item) => {
        obj[item] = this.props.data[item];
      });
      this.setState(obj);
    }
    this.refs.name.focus();
  }
  async submit() {
    const {dispatch, router, pageType} = this.props;
    let {name, phone, address, number} = this.state;
    if (phone == null || phone === '') {
      return Toast.info('请填写手机号码', 1);
    }
    if (regExp('mobile', phone)) {
      return Toast.info('请填写正确的手机号码', 1);
    }
    if (name == null || name === '') {
      return Toast.info('请填写联系人姓名', 1);
    }
    if (address == null || address === '') {
      return Toast.info('请填写地址', 1);
    }
    if (number == null || number === '') {
      return Toast.info('请填写门牌号', 1);
    }
    // pageType 1 修改地址 0 新增地址
    const handle = pageType === 1 ? await userService.modifyUserAddress(this.state) : await userService.addUserAddress(this.state);
    if (handle) {
      Toast.info(pageType === 1 ? '更新成功' : '新增成功', 1500);
      dispatch(getUserAddress());
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
          title={this.props.title}
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <View style={{marginTop: 10, backgroundColor: '#fff', paddingLeft: 16}}>
            <View style={styles.item}>
              <Text style={styles.label}>{'联系人'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(name) => this.setState({name})}
                  returnKeyType='next'
                  onSubmitEditing={() => { this.refs.phone.focus(); }}
                  value={this.state.name}
                  underlineColorAndroid='transparent'
                  autoCapitalize={'none'}
                  ref={'name'}
                  style={styles.textInput}
                  placeholder='姓名'
                  placeholderTextColor='#aaa' />
                <View style={{paddingTop: 10, marginTop: 10, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f8f8f8'}}>
                  <Button style={{marginLeft: 10}} onPress={() => { this.setState({sex: 0}); }}>
                    <Text style={[styles.radio, this.state.sex === 0 ? styles.active : null]}>{'先生'}</Text>
                  </Button>
                  <Button style={{marginLeft: 10}} onPress={() => { this.setState({sex: 1}); }}>
                    <Text style={[styles.radio, this.state.sex === 1 ? styles.active : null]}>{'女士'}</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{'电话'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(phone) => this.setState({phone})}
                  value={this.state.phone}
                  ref='phone'
                  underlineColorAndroid='transparent'
                  keyboardType={'numeric'}
                  style={styles.textInput}
                  placeholder='收货人电话' placeholderTextColor='#aaa' />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{'地址'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(address) => this.setState({address})}
                  value={this.state.address}
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  placeholder='小区/写字楼/学校'
                  placeholderTextColor='#aaa' />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{'门牌号'}</Text>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={(number) => this.setState({number})}
                  value={this.state.number}
                  underlineColorAndroid='transparent'
                  style={styles.textInput} placeholder='例：2号楼6C021'
                  placeholderTextColor='#aaa' />
              </View>
            </View>
            <View style={[styles.item, {alignItems: 'center'}]}>
              <Text style={{fontSize: px2dp(13), color: '#222', minWidth: 45}}>{'标签'}</Text>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Button style={{marginLeft: 10}} onPress={() => { this.setState({tag: 0}); }}>
                  <Text style={[styles.radio, this.state.tag === 0 ? styles.active : null]}>{'家'}</Text>
                </Button>
                <Button style={{marginLeft: 10}} onPress={() => { this.setState({tag: 1}); }}>
                  <Text style={[styles.radio, this.state.tag === 1 ? styles.active : null]}>{'公司'}</Text>
                </Button>
                <Button style={{marginLeft: 10}} onPress={() => { this.setState({tag: 2}); }}>
                  <Text style={[styles.radio, this.state.tag === 2 ? styles.active : null]}>{'学校'}</Text>
                </Button>
              </View>
            </View>
          </View>
          <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: 'hidden'}} onPress={this.submit.bind(this)}>
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
  active: {
    borderColor: '#81c2ff',
    color: '#0096ff',
  },
  label: {
    minWidth: 45,
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
  radio: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#666',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: px2dp(13),
    backgroundColor: '#fff',
  },
});

EditAddress.propTypes = {
  router: PropTypes.object,
  data: PropTypes.object,
  pageType: PropTypes.number,
  title: PropTypes.string,
  dispatch: PropTypes.func,
  // user: PropTypes.any,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};

export default connect(select)(EditAddress);
