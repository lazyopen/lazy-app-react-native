import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Navigation from './app';
import {setGlobalStore} from './util/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render () {
    setGlobalStore(this.state.store);
    return (
      <Provider store={this.state.store}>
        <View style={{backgroundColor: Platform.OS === 'ios' ? '#000' : '#0398ff', flex: 1}}>
          <Navigation />
        </View>
      </Provider>
    );
  }
}

export default App;
