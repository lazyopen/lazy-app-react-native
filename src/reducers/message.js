import * as types from '../constants/ActionTypes';
import {removeListItem} from '../util/index';

const initialState = {
  messagePage: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  messageDet: {},
  unReadMessageCount: 0,
};

export default function (state = initialState, action) {
  const {payload = {}, meta = {}, type} = action;
  // console.log('action', action);
  const {sequence = {}, data = {}} = meta;
  if (sequence.type === 'start') {
    return state;
  }
  let {list, page, maxPage, total} = payload;
  switch (type) {
    case types.GET_MESSAGES_LIST:
      let viewType = 'messagePage';
      return {
        ...state,
        [viewType]: {
          list: page === 1 ? list : (state[viewType].page >= state[viewType].maxPage ? state[viewType].list : state[viewType].list.concat(list)),
          page,
          maxPage,
          total,
        },
      };
    case types.GET_UNREAD_MESSAGE_COUNT:
      return {
        ...state,
        unReadMessageCount: total,
      };
    case types.MARK_AS_READ:
      return {
        ...state,
        unReadMessageCount: state.unReadMessageCount - 1 < 0 ? 0 : state.unReadMessageCount - 1,
      };
    case types.DEL_MESSAGE:
      let message = [...state.messagePage.list];
      removeListItem(message, payload);
      let unReadMessageCount = state.unReadMessageCount;
      if (payload.isRead === 0) {
        unReadMessageCount -= 1;
      }
      return {
        ...state,
        messagePage: {
          ...state.messagePage,
          list: message,
        },
        unReadMessageCount: unReadMessageCount < 0 ? 0 : unReadMessageCount,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
