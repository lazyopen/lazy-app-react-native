import React, {Component, PropTypes} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import _ from 'lodash';
import HtmlRender from 'react-native-html-render';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CustomImage from './CustomImage';
import {parseImgUrl, link} from '../../util';

const {width} = Dimensions.get('window');
const defaultMaxImageWidth = width - 30 - 20;

const styles = StyleSheet.create({
  defaultImg: {
    height: defaultMaxImageWidth,
    width: defaultMaxImageWidth,
    resizeMode: Image.resizeMode.cover,
    borderRadius: 5,
    margin: 10,
  },
});

class Html extends Component {
  static propTypes = {
    router: PropTypes.object,
    imgStyle: PropTypes.object,
  };

  static defaultProps = {
    maxImageWidth: defaultMaxImageWidth,
  };

  constructor (props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  _onLinkPress (url) {
    // let router = this.props.router;
    //
    // if (/^\/user\/\w*/.test(url)) {
    //   let authorName = url.replace(/^\/user\//, '');
    //
    //   router.toUser({
    //     userName: authorName,
    //   });
    // }
    link(url);
  }

  _renderNode (node, index, parent, type) {
    const name = node.name;
    const {imgStyle = styles.defaultImg, maxImageWidth} = this.props;
    if (node.type === 'block' && type === 'block') {
      if (name === 'img') {
        const uri = parseImgUrl(node.attribs.src);
        const imageId = _.uniqueId('image_');
        return (
          <CustomImage
            key={imageId}
            uri={uri}
            style={imgStyle}
            defaultSize={{
              height: 300,
              width: defaultMaxImageWidth,
            }}
            maxImageWidth={maxImageWidth}
          />
        );
      }
    }
  }

  render () {
    return (
      <HtmlRender
        value={this.props.content}
        stylesheet={this.props.style}
        onLinkPress={this._onLinkPress.bind(this)}
        renderNode={this._renderNode.bind(this)}
      />
    );
  }
}

export default Html;
