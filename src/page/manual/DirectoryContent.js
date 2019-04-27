import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import NavBar from '../../component/NavBar';
import px2dp, { genColor } from '../../util/index';
import { MarkdownView } from 'react-native-markdown-view';
import theme from '../../config/theme';

const markdownStyles = {
  text: {
    fontSize: px2dp(16),
    lineHeight: px2dp(24),
  },
};

export default class DirectoryContent extends Component {
  constructor(props) {
    super(props);
    this.headerColor = genColor();
  }

  back() {
    this.props.router.pop();
  }

  render() {
    let {zhContent, directoryName} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NavBar
          title={directoryName}
          leftIcon='ios-arrow-back'
          leftPress={this.back.bind(this)}
          style={{backgroundColor: this.headerColor}}
        />
        <ScrollView style={styles.content}>
          <MarkdownView styles={markdownStyles}>{zhContent}</MarkdownView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: theme.globalPadding,
    marginBottom: theme.globalPadding,
  },
});

DirectoryContent.propTypes = {
  router: PropTypes.object,
  directoryName: PropTypes.any,
  zhContent: PropTypes.any,
};
