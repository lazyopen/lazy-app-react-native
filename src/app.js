import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import Router from './config/router';
import {Navigator} from 'react-native-deprecated-custom-components';
import SignIn from './page/auth/SignIn';

let initialRoute = {
  component: SignIn,
  name: 'SignIn',
};
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  renderScene ({ component, name, props, id, index }, navigator) {
    this.router = this.router || new Router(navigator);
    if (component) {
      return React.createElement(component, {
        ...props,
        ref: view => this[index] = view,
        router: this.router,
        route: {
          name,
          id,
          index,
        },
      });
    }
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  render () {
    return Platform.OS === 'ios' ? (
      <Navigator
        initialRoute={initialRoute}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    ) : (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='#0398ff'
          barStyle='light-content'
        />
        <Navigator
          initialRoute={initialRoute}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
}

export default connect()(Navigation);
