import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ModalIndicator } from 'teaset';
import { thirdLogin } from '../../actions/user';
import config from '../../config';
import MyWebView from '../../component/MyWebView';

class GitHubLogin extends Component {
  constructor (props) {
    super(props);
  }
  back() {
    this.props.router.pop();
  }
  _onMessage(evt) {
    // console.log(evt.nativeEvent.data);
    ModalIndicator.show('GitHub授权登录中...');
    this.props.dispatch(thirdLogin({thirdSource: 3, thirdCode: evt.nativeEvent.data}));
  }
  render () {
    let url = 'https://github.com/login/oauth/authorize?client_id=a5fef0bae0a92053e612&state=' +
      new Date().getTime() +
      '&redirect_uri=' + config.domain + '/rest/auth/thirdLogin/gitHub';
    console.log(url);
    return (
      <MyWebView
        onMessage={this._onMessage.bind(this)}
        title={'GitHub登录'}
        leftPress={this.back.bind(this)}
        source={{uri: url}} />
    );
  }
}

GitHubLogin.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
};

const select = (state = {}) => {
  let {user, userUI} = state;
  return {...user, ...userUI};
};
export default connect(select)(GitHubLogin);
