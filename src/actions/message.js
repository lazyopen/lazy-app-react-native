import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as messageService from '../services/messageService';

export const getUnreadMessageCount = createAction(types.GET_UNREAD_MESSAGE_COUNT, async () => {
  return await messageService.getUnreadMessageCount();
});

export const markAsRead = createAction(types.MARK_AS_READ, async (data) => {
  return await messageService.markAsRead(data);
}, function (data) {
  return {
    data,
    sync: 'message',
  };
});

export const getMessageList = createAction(types.GET_MESSAGES_LIST, async (data) => {
  return await messageService.getMessage(data);
}, (data) => {
  return {
    data,
    sync: 'message',
  };
});

export const getUnReadMessageCount = createAction(types.GET_UNREAD_MESSAGE_COUNT, async () => {
  return await messageService.getMessage({page: 1, isRead: 0});
}, (data) => {
  return {
    data,
    sync: 'message',
  };
});

export const delMessage = createAction(types.DEL_MESSAGE, async (payload) => {
  await messageService.delMessage(payload);
  return payload;
});
