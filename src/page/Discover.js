import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, FlatList, Image, Dimensions, PixelRatio} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import px2dp, { parseImgUrl } from '../util/index';
import ImageButton from '../component/ImageButtonWithText';
import SearchBar from '../component/SearchBar';
import ItemDoc from '../component/ItemDoc';
import { getDoc } from '../actions/doc';
import FooterLoading from '../component/base/FooterLoading';
import EmptyData from '../component/base/EmptyData';
import theme from '../config/theme';

const bannerImages = [
  require('../image/banner01.png'),
  require('../image/banner02.png'),
  require('../image/banner03.png'),
];

class Discover extends Component {
  constructor(props) {
    super(props);
    this._onPressItem = this._onPressItem.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }
  componentDidMount() {
    let {doc = {}} = this.props;
    if (doc.list.length === 0) {
      this._getDocList(1);
    }
  }
  _getDocList(page) {
    this.props.dispatch(getDoc({page}));
  }
  _onEndReached(info) {
    if (info.distanceFromEnd > 0) {
      let { doc } = this.props;
      let dataPage = doc.page + 1;
      if (dataPage <= doc.maxPage) {
        this._getDocList(dataPage);
      }
    }
  }
  _onRefresh() {
    this._getDocList(1);
  }
  _searchButtonCallback() {
  }
  _onPressItem(item) {
    let {router} = this.props;
    router.toDocDetails(item);
  }
  _imageButtonCallback(item) {
    let {router} = this.props;
    router.toSubjectDetails(item);
  }
  _renderHeader() {
    return (
      <View style={{backgroundColor: '#f5f5f5'}}>
        <Swiper
          dotStyle={{marginTop: px2dp(130)}}
          activeDotStyle={{marginTop: px2dp(130)}}
          height={px2dp(138)}
          autoplay
          bounces>
          {bannerImages.map((item, index) => {
            return (
              <View key={index} style={styles.slide}>
                <Image style={styles.image} source={bannerImages[index]} resizeMode='stretch' />
              </View>
            );
          })}
        </Swiper>
        <View style={styles.imageBtnLine}>
          {this.props.config.subject.map((item, index) => {
            return (
              <ImageButton
                key={index}
                image={parseImgUrl(item.subjectCover)}
                imgSize={35}
                text={item.subjectName}
                color='#000'
                btnStyle={styles.imgBtn}
                onPress={this._imageButtonCallback.bind(this, item)} />
            );
          })}
        </View>
        <View style={styles.header}>
          <Text style={{fontSize: px2dp(14), fontWeight: 'bold'}}>热门文章</Text>
        </View>
      </View>
    );
  }

  render() {
    let {doc = {}, refreshing, loadedData} = this.props;
    let { page, maxPage, list = [] } = doc;
    return (
      <View style={styles.container}>
        <SearchBar onPress={() => this.props.router.toSearchDoc()} />
        <FlatList
          tintColor='#fff'
          colors={['#ddd', '#0398ff']}
          progressBackgroundColor='#ffffff'
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={this._onRefresh}
          style={styles.listView}
          data={list}
          renderItem={(itemData) => { return (<ItemDoc onPress={this._onPressItem} itemData={itemData} />); }}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={this._renderHeader.bind(this)}
          ListFooterComponent={() => { return (<FooterLoading noData={page >= maxPage && list.length > 0} show={loadedData} />); }}
          ListEmptyComponent={() => { return (<EmptyData marginTop={20} />); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  slide: {

  },
  image: {
    height: px2dp(138),
    width: Dimensions.get('window').width,
  },
  imageBtnLine: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#d5d5d5',
  },
  imgBtn: {
    height: px2dp(80),
    width: Dimensions.get('window').width / 4,
  },
  listView: {
    backgroundColor: '#fff',
    marginBottom: theme.bottomMenuHeight,
  },
  header: {
    marginTop: 10,
    backgroundColor: '#fff',
    height: px2dp(40),
    paddingLeft: px2dp(15),
    justifyContent: 'center',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#d5d5d5',
  },
});

Discover.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  refreshing: PropTypes.any,
  loadedData: PropTypes.any,
  config: PropTypes.any,
  doc: PropTypes.object,
};

const select = (state = {}) => {
  let {doc, docUI, home} = state;
  return {...doc, ...docUI, ...home};
};
export default connect(select)(Discover);
