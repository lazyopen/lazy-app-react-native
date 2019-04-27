import {Platform, BackHandler} from 'react-native';
import _ from 'lodash';

import * as CustomSceneConfigs from './sceneConfig';
import SignIn from '../page/auth/SignIn';
import SignUp from '../page/auth/SignUp';
import GitHubLogin from '../page/auth/GitHubLogin';
import ForgetPassword from '../page/auth/ForgetPassword';
import Main from '../page/Main';
import EditDoc from '../page/doc/EditDoc';
import DocDetails from '../page/doc/DocDetails';
import CommentDetails from '../page/doc/CommentDetails';
import EditSimpleDoc from '../page/doc/EditSimpleDoc';
import UserProfile from '../page/my/UserProfile';
import EditPassword from '../page/my/EditPassword';
import MyDoc from '../page/my/MyDoc';
import DraftDoc from '../page/my/DraftDoc';
import LikeDoc from '../page/my/LikeDoc';
import CollectDoc from '../page/my/CollectDoc';
import ReadDoc from '../page/my/ReadDoc';
import EditUserInfo from '../page/my/EditUserInfo';
import Address from '../page/my/Address';
import EditAddress from '../page/my/EditAddress';
import Setting from '../page/my/Setting';
import About from '../page/my/About';
import Discover from '../page/Discover';
import Message from '../page/message/Message';
import Subject from '../page/subject/Subject';
import EditSubject from '../page/subject/EditSubject';
import SubjectDetails from '../page/subject/SubjectDetails';
import AddSubjectDoc from '../page/subject/AddSubjectDoc';
import SearchDoc from '../page/search/SearchDoc';
import DownloadManual from '../page/manual/DownloadManual';
import DirectoryManual from '../page/manual/DirectoryManual';
import DirectoryContent from '../page/manual/DirectoryContent';

class Router {
  constructor (navigator) {
    this.navigator = navigator;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        const routesList = this.navigator.getCurrentRoutes();
        const currentRoute = routesList[routesList.length - 1];
        if (currentRoute.name !== 'home') {
          navigator.pop();
          return true;
        }
        return false;
      });
    }
  }

  push (props = {}, route) {
    let routesList = this.navigator.getCurrentRoutes();
    let nextIndex = routesList[routesList.length - 1].index + 1;
    route.props = props;
    route.index = nextIndex;
    route.sceneConfig = route.sceneConfig || CustomSceneConfigs.customFloatFromRight;
    route.id = _.uniqueId();
    this.navigator.push(route);
  }

  popToRoute (props = {}, route) {
    let routesList = this.navigator.getCurrentRoutes();
    let nextIndex = routesList[routesList.length - 1].index;
    route.props = props;
    route.index = nextIndex;
    route.sceneConfig = route.sceneConfig || CustomSceneConfigs.customFloatFromRight;
    route.id = _.uniqueId();
    this.navigator.popToRoute(route);
  }

  pop () {
    this.navigator.pop();
  }

  toMain (props) {
    this.push(props, {
      component: Main,
      name: 'Main',
    });
  }
  resetToMain() {
    this.navigator.resetTo({
      component: Main,
      name: 'Main',
    });
  }
  resetToSignIn() {
    this.navigator.resetTo({
      component: SignIn,
      name: 'SignIn',
    });
  }

  toSignIn (props) {
    this.push(props, {
      component: SignIn,
      name: 'SignIn',
    });
  }

  toSignUp (props) {
    this.push(props, {
      component: SignUp,
      name: 'SignUp',
    });
  }

  toForgetPassword(props) {
    this.push(props, {
      component: ForgetPassword,
      name: 'ForgetPassword',
    });
  }

  toAddress (props) {
    this.push(props, {
      component: Address,
      name: 'Address',
    });
  }

  toEditAddress (props) {
    this.push(props, {
      component: EditAddress,
      name: 'EditAddress',
    });
  }

  toEditDoc (props) {
    this.push(props, {
      component: EditDoc,
      name: 'EditDoc',
      sceneConfig: CustomSceneConfigs.customFloatFromBottom,
    });
  }

  toDocDetails (props) {
    this.push(props, {
      component: DocDetails,
      name: 'DocDetails',
    });
  }

  toCommentDetails (props) {
    this.push(props, {
      component: CommentDetails,
      name: 'CommentDetails',
    });
  }

  toEditSimpleDoc (props) {
    this.push(props, {
      component: EditSimpleDoc,
      name: 'EditSimpleDoc',
      sceneConfig: CustomSceneConfigs.customFloatFromBottom,
    });
  }

  toDiscover (props) {
    this.push(props, {
      component: Discover,
      name: 'Discover',
    });
  }

  toEditPassword (props) {
    this.push(props, {
      component: EditPassword,
      name: 'EditPassword',
    });
  }

  toUserProfile (props) {
    this.push(props, {
      component: UserProfile,
      name: 'UserProfile',
    });
  }

  toEditUserInfo (props) {
    this.push(props, {
      component: EditUserInfo,
      name: 'EditUserInfo',
    });
  }

  toSetting (props) {
    this.push(props, {
      component: Setting,
      name: 'Setting',
    });
  }

  toMyDoc (props) {
    this.push(props, {
      component: MyDoc,
      name: 'MyDoc',
    });
  }

  toDraftDoc (props) {
    this.push(props, {
      component: DraftDoc,
      name: 'DraftDoc',
    });
  }

  toCollectDoc (props) {
    this.push(props, {
      component: CollectDoc,
      name: 'CollectDoc',
    });
  }

  toLikeDoc (props) {
    this.push(props, {
      component: LikeDoc,
      name: 'LikeDoc',
    });
  }

  toReadDoc (props) {
    this.push(props, {
      component: ReadDoc,
      name: 'ReadDoc',
    });
  }

  toMessage (props) {
    this.push(props, {
      component: Message,
      name: 'Message',
    });
  }

  toSubject (props) {
    this.push(props, {
      component: Subject,
      name: 'Subject',
    });
  }

  toSubjectDetails (props) {
    this.push(props, {
      component: SubjectDetails,
      name: 'SubjectDetails',
    });
  }

  toEditSubject (props) {
    this.push(props, {
      component: EditSubject,
      name: 'EditSubject',
    });
  }

  toAddSubjectDoc (props) {
    this.push(props, {
      component: AddSubjectDoc,
      name: 'AddSubjectDoc',
    });
  }

  toAbout(props) {
    this.push(props, {
      component: About,
      name: 'About',
    });
  }

  toSearchDoc (props) {
    this.push(props, {
      component: SearchDoc,
      name: 'SearchDoc',
    });
  }

  toDownloadManual (props) {
    this.push(props, {
      component: DownloadManual,
      name: 'DownloadManual',
    });
  }

  toDirectoryManual (props) {
    this.push(props, {
      component: DirectoryManual,
      name: 'DirectoryManual',
    });
  }

  toDirectoryContent (props) {
    this.push(props, {
      component: DirectoryContent,
      name: 'DirectoryContent',
    });
  }

  toGitHubLogin (props) {
    this.push(props, {
      component: GitHubLogin,
      name: 'GitHubLogin',
    });
  }
}

export default Router;
