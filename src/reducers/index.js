import { combineReducers } from 'redux';
import home from './home';
import user from './user';
import userUI from './userUI';
import comment from './comment';
import commentUI from './commentUI';
import doc from './doc';
import docUI from './docUI';
import utils from './utils';
import message from './message';
import messageUI from './messageUI';
import subject from './subject';
import subjectUI from './subjectUI';
import search from './search';
import searchUI from './searchUI';

export default combineReducers({
  home,
  user,
  userUI,
  comment,
  commentUI,
  doc,
  docUI,
  utils,
  message,
  messageUI,
  subject,
  subjectUI,
  search,
  searchUI,
});
