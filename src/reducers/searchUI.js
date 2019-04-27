import * as types from '../constants/ActionTypes';

const initialState = {
  refreshing: false,
  loadedData: false,
};

export default function (state = initialState, action) {
  const { type, meta = {} } = action;
  const { sequence = {}, data = {} } = meta;

  switch (type) {
    case types.GET_HOME_CONFIG:
      return {
        ...state,
        refreshing: sequence.type === 'start' && (data.page === 1 || !data.page),
        loadedData: sequence.type === 'start' && data.page > 1,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
