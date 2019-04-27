import * as types from '../constants/ActionTypes';

const initialState = {
  toast: {
    text: null,
    timeout: 1,
  },
};

export default function (state = initialState, action) {
  const { payload = {} } = action;
  switch (action.type) {
    case types.TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          ...payload,
        },
      };
    case types.CLOSE_TOAST:
      return {
        ...state,
        toast: null,
      };
    default :
      return state;
  }
}
