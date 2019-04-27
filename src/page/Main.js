import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import {Badge} from 'teaset';
import px2dp from '../util';
import Home from './Home';
import My from './My';
import Discover from './Discover';
import Message from './message/Message';
import theme from '../config/theme';
import { getHomeConfig } from '../actions/home';
import { getUnReadMessageCount } from '../actions/message';

let {width} = Dimensions.get('window');
class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'Discover',
      hideTabBar: false,
    };
    this.tabNames = [
      ['API手册', 'ios-list-box-outline', 'Home', <Home {...this.props} />],
      ['发现', 'ios-compass-outline', 'Discover', <Discover {...this.props} />],
      ['写点什么', 'md-add-circle'],
      ['消息', 'ios-notifications-outline', 'Message', <Message {...this.props} />],
      ['我的', 'ios-contact-outline', 'My', <My {...this.props} />],
    ];
    Main.hideTabBar = Main.hideTabBar.bind(this);
    Main.showTabBar = Main.showTabBar.bind(this);
    this.middleTabHandle = this.middleTabHandle.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    // console.log('SignIn nextProps', nextProps);
    let {token} = nextProps;
    if (!token) {
      // Toast.info('登录已失效，请重新登录');
      this.props.router.resetToSignIn();
      return false;
    }
    return true;
  }
  componentDidMount () {
    this.props.dispatch(getHomeConfig());
    this.props.dispatch(getUnReadMessageCount());
  }

  static showTabBar () {
    this.setState({hideTabBar: false});
  }
  static hideTabBar () {
    this.setState({hideTabBar: true});
  }

  middleTabHandle () {
    this.props.router.toEditDoc();
  }

  render () {
    let {dispatch, unReadMessageCount} = this.props;
    return (
      <TabNavigator
        hidesTabTouch
        tabBarStyle={[styles.tabBar,
          (this.state.hideTabBar ? styles.hide : {}),
        ]}
        style={{borderTopWidth: 0}}
        sceneStyle={{ paddingBottom: styles.tabBar.height }}>
        {
          this.tabNames.map((item, i) => {
            return (
              i === 2
                ? <TabNavigator.Item
                  key={i}
                  tabStyle={styles.tabStyle}
                  renderIcon={() => <Icon name={item[1]} size={px2dp(31)} color='#FF643B' />}
                  onPress={this.middleTabHandle} />
                : <TabNavigator.Item
                  key={i}
                  tabStyle={styles.tabStyle}
                  title={item[0]}
                  selected={this.state.selectedTab === item[2]}
                  selectedTitleStyle={{color: '#FE633B'}}
                  renderIcon={() => <Icon name={item[1]} size={px2dp(22)} color='#666' />}
                  renderBadge={() => (i === 3 && unReadMessageCount > 0) ? <Badge style={{marginTop: 5}} count={unReadMessageCount} /> : null}
                  renderSelectedIcon={() => <Icon name={item[1].replace('-outline', '')} size={px2dp(22)} color='#FF643B' />}
                  onPress={() => { this.setState({ selectedTab: item[2] }); dispatch(getUnReadMessageCount()); }} >
                  {item[3]}
                </TabNavigator.Item>
            );
          })
        }
      </TabNavigator>
    );
  }
}

Main.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  unReadMessageCount: PropTypes.number,
};

const styles = StyleSheet.create({
  tabBar: {
    height: theme.bottomMenuHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  hide: {
    transform: [
      {translateX: width},
    ],
  },
  tabStyle: {
    padding: px2dp(4),
  },
});

const select = (state = {}) => {
  let {user, message} = state;
  return {...user, unReadMessageCount: message.unReadMessageCount};
};
export default connect(select)(Main);
