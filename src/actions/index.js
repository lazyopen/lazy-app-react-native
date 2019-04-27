import * as user from './user';
import * as comment from './comment';
import * as doc from './doc';
import * as utils from './utils';
import * as message from './message';
import * as subject from './subject';
import * as home from './home';
import * as search from './search';

export default {
  ...user,
  ...comment,
  ...doc,
  ...utils,
  ...message,
  ...subject,
  ...home,
  ...search,
};
