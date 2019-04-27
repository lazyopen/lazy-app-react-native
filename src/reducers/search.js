import * as types from '../constants/ActionTypes';
import {removeListItem} from '../util/index';

const initialState = {
  searchDoc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  docKeyWord: [],
};

export default function (state = initialState, action) {
  const {payload = {}, meta = {}, type} = action;
  // console.log('action', action);
  const {sequence = {}, data = {}} = meta;
  if (sequence.type === 'start') {
    return state;
  }
  switch (type) {
    case types.SEARCH_DOC:
      let {list, page, maxPage, total} = payload;
      return {
        ...state,
        searchDoc: {
          list: page === 1 ? list : (state.searchDoc.page >= state.searchDoc.maxPage ? state.searchDoc.list : state.searchDoc.list.concat(list)),
          page,
          maxPage,
          total,
        },
      };
    case types.CLEAR_SEARCH_DOC:
      return {
        ...state,
        searchDoc: initialState.searchDoc,
      };
    case types.ADD_SEARCH_DOC_KEYWORD:
      let docKeyWord = state.docKeyWord;
      if (docKeyWord.indexOf(payload) === -1) {
        docKeyWord = docKeyWord.concat(payload);
      }
      return {
        ...state,
        docKeyWord,
      };
    case types.CLEAR_SEARCH_DOC_KEYWORD:
      return {
        ...state,
        docKeyWord: initialState.docKeyWord,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
