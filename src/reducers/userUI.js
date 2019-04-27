import * as types from '../constants/ActionTypes';

const initialState = {
  refreshing: false,
  loadedData: false,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, meta = {} } = action;
  const { sequence = {} } = meta;

  switch (type) {
    case types.GET_USER_DOC:
      let {data = {}} = meta;
      return {
        ...state,
        refreshing: sequence.type === 'start' && (data.page === 1 || !data.page),
        loadedData: sequence.type === 'start' && data.page > 1,
      };
    case types.LOGIN:
      return {
        ...state,
        loading: sequence.type === 'start',
      };
    case types.REGISTER:
      return {
        ...state,
        loading: sequence.type === 'start',
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
