import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as docService from '../services/docService';
import * as subjectService from '../services/subjectService';

export const getDoc = createAction(types.GET_DOC, async (data) => {
  return await docService.getDoc(data);
}, (data) => {
  return {
    data,
  };
});

export const getDocUserRelation = createAction(types.GET_DOC_USER_RELATION, async (data) => {
  return await docService.getDocUserRelation(data);
}, (data) => {
  return {
    data,
  };
});

export const getDocSubject = createAction(types.GET_DOC_SUBJECT, async (data) => {
  return await subjectService.getSubjectDoc(data);
}, (data) => {
  return {
    data,
  };
});
