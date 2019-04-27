import * as types from '../constants/ActionTypes';
import {removeListItem} from '../util/index';

const initialState = {
  token: null,
  timestamp: null,
  menus: null,
  perms: null,
  roles: null,
  user: {
    username: null,
    mobile: null,
    userExt: {},
  },
  address: [],
  myDoc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  draftDoc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  likeDoc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  collectDoc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  readDoc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
};

export default function (state = initialState, action) {
  const {payload = {}, meta = {}, type} = action;
  // console.log('action', action);
  const {sequence = {}, data = {}} = meta;
  if (sequence.type === 'start') {
    return state;
  }
  let {menus, perms, roles, timestampStr, tokenStr, userObject} = payload;
  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        menus,
        perms,
        roles,
        timestamp: timestampStr,
        token: tokenStr,
        user: userObject,
      };
    case types.REGISTER:
      return {
        ...state,
        menus,
        perms,
        roles,
        timestamp: timestampStr,
        token: tokenStr,
        user: userObject,
      };
    case types.THIRD_LOGIN:
      return {
        ...state,
        menus,
        perms,
        roles,
        timestamp: timestampStr,
        token: tokenStr,
        user: userObject,
      };
    case types.MODIFY_USER_PASSWORD:
      return {
        ...state,
        timestamp: timestampStr,
        token: tokenStr,
      };
    case types.GET_USER_INFO:
      return {
        ...state,
        user: payload,
      };
    case types.GET_USER_ADDRESS:
      return {
        ...state,
        address: payload,
      };
    case types.DEL_USER_ADDRESS:
      let address = [...state.address];
      removeListItem(address, payload);
      return {
        ...state,
        address,
      };
    case types.GET_USER_DOC:
      let {list, page, maxPage, total} = payload;
      if (data.docViewType != null) {
        let viewTypeList = ['draftDoc', 'myDoc', 'likeDoc', 'collectDoc', 'readDoc'];
        let viewType = viewTypeList[data.docViewType];
        return {
          ...state,
          [viewType]: {
            list: page === 1 ? list : (state[viewType].page >= state[viewType].maxPage ? state[viewType].list : state[viewType].list.concat(list)),
            page,
            maxPage,
            total,
          },
        };
      }
      return {
        ...state,
      };
    case types.DEL_USER_DOC:
      let myDocList = [...state.myDoc.list];
      removeListItem(myDocList, payload);
      return {
        ...state,
        myDoc: {
          ...state.myDoc,
          list: myDocList,
        },
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
