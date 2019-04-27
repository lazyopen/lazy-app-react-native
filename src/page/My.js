import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../component/NavBar';
import Item from '../component/ItemButton';
import px2dp, {parseImgUrl} from '../util';
import { getUserInfo } from '../actions/user';
import Icon from 'react-native-vector-icons/Ionicons';
let {height} = Dimensions.get('window');

class My extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    let {draftDoc, likeDoc, collectDoc, myDoc, readDoc, subject, router} = this.props;
    this.config = [
      {icon: 'ios-albums', name: '草稿箱', subName: draftDoc.total, onPress: () => router.toDraftDoc()},
      {icon: 'ios-heart', name: '喜欢的文章', subName: likeDoc.total, color: '#fc7b53', onPress: () => router.toLikeDoc()},
      {icon: 'md-list-box', name: '收藏的文章', subName: collectDoc.total, onPress: () => router.toCollectDoc()},
      {icon: 'ios-bookmarks', name: '我的文章', subName: myDoc.total, color: '#fc7b53', onPress: () => router.toMyDoc()},
      {icon: 'md-apps', name: '我的专题', subName: subject.total, color: '#94d94a', onPress: () => router.toSubject()},
      {icon: 'ios-time', name: '浏览历史', subName: readDoc.total, color: '#ffc636', onPress: () => router.toReadDoc()},
      {icon: 'md-pin', name: '收货地址', onPress: this.goAddress.bind(this)},
      // {icon: 'md-flower', name: '服务中心'},
      {icon: 'ios-outlet', name: '问题反馈', onPress: () => router.toAbout()},
      // {icon: 'md-contacts', name: '合作伙伴'},
    ];

    this.onRefresh = this.onRefresh.bind(this);
  }
  goAddress () {
    this.props.router.toAddress();
  }
  leftPress () {

  }
  goProfile () {
    this.props.router.toUserProfile();
  }
  componentDidMount () {
    this.onRefresh();
  }
  async onRefresh () {
    this.setState({isLoading: true});
    const {dispatch} = this.props;
    try {
      await Promise.race([
        dispatch(getUserInfo()),
      ]);
    } catch (e) {
      // const message = e.message || e;
      return;
    } finally {
      this.setState({isLoading: false});
    }
  }
  _renderListItem () {
    return this.config.map((item, i) => {
      if (i % 3 === 0) {
        item.first = true;
      }
      return (<Item key={i} {...item} />);
    });
  }
  render () {
    let {user = {}} = this.props;
    let {userExt = {}} = user;
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <NavBar
          title='我的'
          // leftIcon='ios-notifications-outline'
          // leftPress={this.leftPress.bind(this)}
          rightIcon='ios-settings-outline'
          rightPress={() => this.props.router.toSetting()}
        />
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.onRefresh}
              tintColor='#fff'
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor='#ffffff'
            />
          }
        >
          <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: '#f3f3f3'}}>
            <TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
              <View style={styles.userHead}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Image source={parseImgUrl(userExt.userImg)} style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}} />
                  <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                    <Text style={{color: '#fff', fontSize: px2dp(18)}}>{userExt.nickname || '暂无'}</Text>
                    <View style={{marginTop: px2dp(10), flexDirection: 'row'}}>
                      <Icon name='ios-phone-portrait-outline' size={px2dp(14)} color='#fff' />
                      <Text style={{color: '#fff', fontSize: 13, paddingLeft: 5}}>{user.mobile || '暂无信息'}</Text>
                    </View>
                  </View>
                </View>
                <Icon name='ios-arrow-forward-outline' size={px2dp(22)} color='#fff' />
              </View>
            </TouchableWithoutFeedback>
            {/* <View style={styles.numbers}> */}
            {/* <TouchableWithoutFeedback> */}
            {/* <View style={styles.numItem}> */}
            {/* <Text style={{color: '#f90', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{'9999.0元'}</Text> */}
            {/* <Text style={{color: '#333', fontSize: 12, textAlign: 'center', paddingTop: 5}}>{'余额'}</Text> */}
            {/* </View> */}
            {/* </TouchableWithoutFeedback> */}
            {/* <TouchableWithoutFeedback> */}
            {/* <View style={[styles.numItem, {borderLeftWidth: 1, borderLeftColor: '#f5f5f5', borderRightWidth: 1, borderRightColor: '#f5f5f5'}]}> */}
            {/* <Text style={{color: '#ff5f3e', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{'1940个'}</Text> */}
            {/* <Text style={{color: '#333', fontSize: 12, textAlign: 'center', paddingTop: 5}}>{'优惠'}</Text> */}
            {/* </View> */}
            {/* </TouchableWithoutFeedback> */}
            {/* <TouchableWithoutFeedback> */}
            {/* <View style={styles.numItem}> */}
            {/* <Text style={{color: '#6ac20b', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{'999999分'}</Text> */}
            {/* <Text style={{color: '#333', fontSize: 12, textAlign: 'center', paddingTop: 5}}>{'积分'}</Text> */}
            {/* </View> */}
            {/* </TouchableWithoutFeedback> */}
            {/* </View> */}
            <View>
              {this._renderListItem()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: px2dp(46),
    backgroundColor: '#0398ff',
  },
  userHead: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#0398ff',
  },
  numbers: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 74,
  },
  numItem: {
    flex: 1,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

My.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.any,
  draftDoc: PropTypes.object,
  likeDoc: PropTypes.object,
  collectDoc: PropTypes.object,
  myDoc: PropTypes.object,
  readDoc: PropTypes.object,
  subject: PropTypes.object,
};

const select = (state = {}) => {
  let {user, subject} = state;
  return {...user, ...subject};
};
export default connect(select)(My);
