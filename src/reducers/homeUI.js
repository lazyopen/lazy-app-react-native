import * as types from '../constants/ActionTypes';

const initialState = {
  refreshing: false,
  loadedData: false,
};

export default function (state = initialState, action) {
  const { type, meta = {} } = action;
  const { sequence = {} } = meta;
  switch (type) {
    case types.GET_HOME_CONFIG:
      let {data = {}} = meta;
      return {
        ...state,
        refreshing: sequence.type === 'start',
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
