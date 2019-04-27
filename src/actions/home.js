import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as homeService from '../services/homeService';

export const getHomeConfig = createAction(types.GET_HOME_CONFIG, async () => {
  return await homeService.getHomeConfig();
});

export const getApiManualList = createAction(types.GET_API_MANUAL_LIST, async () => {
  return await homeService.getApiManualList();
});

export const downApiManual = createAction(types.DOWN_API_MANUAL, async (data) => {
  return await homeService.downApiManual(data);
});

export const delApiManual = createAction(types.DEL_API_MANUAL, (data) => {
  return data;
});
