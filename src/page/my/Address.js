import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import px2dp from '../../util';
import NavBar from '../../component/NavBar';
import CompButton from '../../component/Button';
import { getUserAddress, delUserAddress } from '../../actions/user';

class Address extends Component {
  constructor (props) {
    super(props);
    this.state = {
      item: null,
    };
    this.del = this.del.bind(this);
  }
  componentDidMount () {
    this.onRefresh();
  }
  onRefresh () {
    const {dispatch} = this.props;
    dispatch(getUserAddress());
  }
  add () {
    this.props.router.toEditAddress({
      pageType: 0,
      title: '新增地址',
    });
  }
  edit (data) {
    this.props.router.toEditAddress({
      pageType: 1,
      title: '修改地址',
      data,
    });
  }
  del () {
    Alert.alert(
      '删除地址',
      '确认删除该收货地址吗？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '删除',
          onPress: () => {
            let {dispatch} = this.props;
            // console.log(this.props);
            dispatch(delUserAddress(this.state.item));
          } },
      ],
      { cancelable: false }
    );
    // console.log(this.state);
    // console.log(data);
  }
  back () {
    this.props.router.pop();
  }
  render () {
    const tags = ['家', '公司', '学校'];
    const colors = ['#ff6000', '#0096ff', '#5bb774'];
    let {address = []} = this.props;
    let handleBtns = [
      {
        text: '删除',
        backgroundColor: '#d9534f',
        onPress: this.del,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title='收货地址'
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          {address.map((item, i) => {
            return (
              <Swipeout
                key={i}
                autoClose
                onOpen={() => { this.setState({item}); }}
                right={handleBtns}
                backgroundColor='#ffffff'
              >
                <View style={styles.address}>
                  <View>
                    <Text style={{color: '#333', fontSize: px2dp(14)}}>{item.name + ' ' + item.phone}</Text>
                    <View style={styles.ads1List}>
                      {item.tag == null ? null : <Text style={[styles.tag, { backgroundColor: colors[item.tag] || '#0096ff' }]}>{tags[item.tag]}</Text> }
                      <Text style={{color: '#bbb', fontSize: px2dp(13)}}>{item.address}</Text>
                    </View>
                  </View>
                  <Icon onPress={this.edit.bind(this, item)} name='md-create' size={22} color='#ccc' />
                </View>
              </Swipeout>
            );
          })}
        </ScrollView>
        <CompButton style={{position: 'absolute', bottom: 0, left: 0, right: 0, flex: 1}} onPress={this.add.bind(this)}>
          <View style={{height: px2dp(45), flexDirection: 'row', backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name='ios-add-circle-outline' size={18} color='#0096ff' />
            <Text style={{color: '#0096ff', fontSize: px2dp(14), marginLeft: 8}}>{'新增地址'}</Text>
          </View>
        </CompButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  address: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fbfbfb',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  tag: {
    color: '#fff',
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: 'center',
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  ads1List: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
});

Address.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  address: PropTypes.array,
};

const select = (state = {}) => {
  let {user} = state;
  return user;
};

export default connect(select)(Address);
