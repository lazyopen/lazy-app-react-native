import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { MarkdownView } from 'react-native-markdown-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { renderFormatButtons } from './renderButtons';

const FOREGROUND_COLOR = '#999999';
const styles = StyleSheet.create({
  composeText: {
    borderColor: '#eaeaea',
    borderBottomWidth: 1,
    flexDirection: 'column',
    flex: 1,
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
  },
  inlinePadding: {
    padding: 8,
  },
  preview: {
    flex: 0.5,
    padding: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const markdownStyles = {
  heading1: {
    fontSize: 24,
    color: 'purple',
  },
  link: {
    color: '#0366d6',
  },
  mailTo: {
    color: 'orange',
  },
  // text: {
  //   color: '#555555',
  // },
};

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || (Platform.OS === 'ios' ? '' : ' '),
      selection: { start: 0, end: 0 },
      showPreview: props.showPreview ? props.showPreview : false,
    };
  }
  textInput: TextInput;

  changeText = (input: string) => {
    this.setState({ text: input });
    if (this.props.onMarkdownChange) this.props.onMarkdownChange(input);
  };

  onSelectionChange = event => {
    this.setState({
      selection: event.nativeEvent.selection,
    });
  };

  componentDidMount() {
    this.textInput.focus();
  }

  getState = () => {
    this.setState({
      selection: {
        start: 1,
        end: 1,
      },
    });
    return this.state;
  };

  convertMarkdown = () => {
    this.setState({ showPreview: !this.state.showPreview });
  };

  renderPreview = () => {
    return (
      <View style={styles.preview}>
        <ScrollView removeClippedSubviews>
          <MarkdownView styles={markdownStyles}>
            {this.state.text === '' ? '' : this.state.text}
          </MarkdownView>
        </ScrollView>
      </View>
    );
  };

  showSetting(view) {
    let {onSettingPress = () => {}} = this.props;
    onSettingPress(view);
  }
  render() {
    const WrapperView = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
    const { Formats, markdownButton } = this.props;
    const { text, selection, showPreview } = this.state;
    return (
      <WrapperView behavior='padding' style={styles.screen}>
        <TextInput
          style={styles.composeText}
          multiline
          underlineColorAndroid='transparent'
          onChangeText={this.changeText}
          onSelectionChange={this.onSelectionChange}
          value={text}
          placeholder={'写点什么吧'}
          ref={textInput => (this.textInput = textInput)}
          selection={selection}
        />
        {showPreview ? this.renderPreview() : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.convertMarkdown}
            style={{ padding: 5, borderRightWidth: 1, borderColor: '#eaeaea' }}>
            <Image
              style={[styles.button, { tintColor: FOREGROUND_COLOR, padding: 8 }]}
              source={require('../static/visibility.png')}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          {renderFormatButtons(
            {
              getState: this.getState,
              setState: (state, callback) => {
                this.textInput.focus();
                this.setState(state, callback);
              },
            },
            Formats,
            markdownButton,
          )}
          <TouchableOpacity
            ref='settingButton'
            onPress={() => this.showSetting(this.refs['settingButton'])}
            style={{ paddingVertical: 5, paddingHorizontal: 8, borderLeftWidth: 1, borderColor: '#eaeaea' }}>
            <Icon name='ios-settings' size={24} color='#999999' />
          </TouchableOpacity>
        </View>
      </WrapperView>
    );
  }
}

MarkdownEditor.propTypes = {
  onSettingPress: PropTypes.any,
  onMarkdownChange: PropTypes.any,
  Formats: PropTypes.any,
  markdownButton: PropTypes.any,
  text: PropTypes.any,
  showPreview: PropTypes.any,
};
