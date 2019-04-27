import * as types from '../constants/ActionTypes';

const initialState = {
  comment: {
    total: 0,
    page: 1,
    maxPage: 10,
    list: [],
  },
  commentDet: {
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
  switch (type) {
    case types.GET_COMMENT:
      let {list, page, maxPage, total} = payload;
      if (data.parentId != null) {
        let viewType = data.parentId === '0' ? 'comment' : 'commentDet';
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
    case types.ADD_COMMENT:
      let {parentId} = payload;
      if (parentId === '0') {
        return {
          ...state,
          comment: {
            ...state.comment,
            list: state.comment.list.concat(payload),
          },
        };
      } else {
        return {
          ...state,
          commentDet: {
            ...state.commentDet,
            list: state.commentDet.list.concat(payload),
          },
        };
      }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
