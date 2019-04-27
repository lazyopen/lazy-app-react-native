import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as docService from '../services/docService';

export const searchDoc = createAction(types.SEARCH_DOC, async (data) => {
  return await docService.getDoc(data);
}, (data) => {
  return {
    data,
  };
});
export const addSearchDocKeyword = createAction(types.ADD_SEARCH_DOC_KEYWORD, (payload) => {
  return payload;
});
