import * as types from '../constants/ActionTypes';
import {removeListItem} from '../util/index';

const initialState = {
  doc: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  docUserRelation: {},
  subjectDoc: [],
};

export default function (state = initialState, action) {
  const {payload = {}, meta = {}, type} = action;
  // console.log('action', action);
  const {sequence = {}, data = {}} = meta;
  if (sequence.type === 'start') {
    return state;
  }
  switch (type) {
    case types.GET_DOC:
      let {list, page, maxPage, total} = payload;
      let viewType = 'doc';
      return {
        ...state,
        [viewType]: {
          list: page === 1 ? list : (state[viewType].page >= state[viewType].maxPage ? state[viewType].list : state[viewType].list.concat(list)),
          page,
          maxPage,
          total,
        },
      };
    case types.GET_DOC_USER_RELATION:
      let dur = {};
      if (payload) {
        payload.forEach(function (item) {
          dur[item.relationType] = item;
        });
      }
      return {
        ...state,
        docUserRelation: dur,
      };
    case types.GET_DOC_SUBJECT:
      return {
        ...state,
        subjectDoc: payload,
      };
    case types.ADD_SUBJECT_DOC:
      return {
        ...state,
        subjectDoc: state.subjectDoc.concat(payload),
      };
    case types.DEL_SUBJECT_DOC:
      let subjectDocList = [...state.subjectDoc];
      removeListItem(subjectDocList, payload);
      return {
        ...state,
        subjectDoc: subjectDocList,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
