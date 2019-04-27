import * as types from '../constants/ActionTypes';
import {removeListItem} from '../util/index';

const initialState = {
  subject: {
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
  let {list, page, maxPage, total} = payload;
  switch (type) {
    case types.GET_SUBJECT:

      return {
        ...state,
        subject: {
          list: page === 1 ? list : (state.subject.page >= state.subject.maxPage ? state.subject.list : state.subject.list.concat(list)),
          page,
          maxPage,
          total,
        },
      };
    case types.DEL_SUBJECT:
      let subjectList = [...state.subject.list];
      removeListItem(subjectList, payload);
      return {
        ...state,
        subject: {
          ...state.subject,
          list: subjectList,
        },
      };
    case types.GET_SUBJECT_DOC_LIST:
      let key = data.sort + data.subjectId;
      state[key] = state[key] || {
        total: 0,
        page: 1,
        maxPage: 10,
        list: [],
      };
      return {
        ...state,
        [key]: {
          list: page === 1 ? list : (state[key].page >= state[key].maxPage ? state[key].list : state[key].list.concat(list)),
          page,
          maxPage,
          total,
        },
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
