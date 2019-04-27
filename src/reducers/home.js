import * as types from '../constants/ActionTypes';

let initialState = {
  config: {
    subject: [],
  },
  manual: [],
  downManual: [],
};

export default function (state = initialState, action) {
  const {payload = {}, meta = {}, type} = action;
  const {sequence = {}} = meta;
  if (sequence.type === 'start') {
    return state;
  }
  switch (type) {
    case types.GET_HOME_CONFIG:
      return {
        ...state,
        config: payload,
      };
    case types.GET_API_MANUAL_LIST:
      payload.forEach(function (item) {
        item.downloaded = false;
        state.downManual.forEach(function (t) {
          if (t.id === item.id) {
            item.downloaded = true;
          }
        });
      });
      return {
        ...state,
        manual: payload,
      };
    case types.DOWN_API_MANUAL:
      let addManual = [];
      state.manual.forEach(function (item) {
        if (item.id === payload.id) {
          item.downloaded = true;
        }
        addManual.push(item);
      });
      return {
        ...state,
        manual: addManual,
        downManual: state.downManual.concat(payload),
      };
    case types.DEL_API_MANUAL:
      let downManual = state.downManual;
      downManual.forEach(function (item, index) {
        if (item.id === payload.id) {
          downManual.splice(index, 1);
        }
      });
      let manual = [];
      state.manual.forEach(function (item) {
        if (item.id === payload.id) {
          item.downloaded = false;
        }
        manual.push(item);
      });
      return {
        ...state,
        downManual,
        manual,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
