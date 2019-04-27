import {Dimensions, Platform} from 'react-native';
import px2dp from '../util/index';

const globalTextColor = '#2f2f2f';
export default {
  bottomMenuHeight: px2dp(48),
  globalPadding: 15,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  themeColor: 'rgb(22,131,251)',
  pageBackgroundColor: '#f4f4f4',
  grayTextColor: '#999999',
  blackTextColor: globalTextColor,
  grayIconColor: '#d9d9d9',
  btnActiveOpacity: 0.7,
  actionBar: {
    height: (Platform.OS === 'android') ? px2dp(49) : px2dp(69),
    backgroundColor: 'rgb(22,131,251)',
    fontSize: px2dp(16),
    fontColor: 'white',
  },
  text: {
    color: globalTextColor,
    fontSize: px2dp(14),
  },
  scrollView: {
    fontSize: px2dp(15),
    underlineStyle: {
      backgroundColor: 'white',
    },
  },
};
