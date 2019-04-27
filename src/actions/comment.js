import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as commentService from '../services/commentService';

export const getComment = createAction(types.GET_COMMENT, async (data) => {
  return await commentService.getComment(data);
}, (data) => {
  return {
    data,
  };
});

export const addComment = createAction(types.ADD_COMMENT, (payload) => {
  return payload;
});
