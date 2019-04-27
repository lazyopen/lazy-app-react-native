import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as subjectService from '../services/subjectService';
import * as docService from '../services/docService';

export const getSubject = createAction(types.GET_SUBJECT, async (data) => {
  return await subjectService.getSubject(data);
}, (data) => {
  return {
    data,
  };
});

export const delSubject = createAction(types.DEL_SUBJECT, async (payload) => {
  subjectService.delSubject(payload);
  return payload;
});

export const getSubjectDocList = createAction(types.GET_SUBJECT_DOC_LIST, async (data) => {
  return await docService.getDoc(data);
}, (data) => {
  return {
    data,
  };
});

export const addSubjectDoc = createAction(types.ADD_SUBJECT_DOC, async (data) => {
  return await subjectService.addSubjectDoc(data);
});
export const delSubjectDoc = createAction(types.DEL_SUBJECT_DOC, async (payload) => {
  subjectService.delSubjectDoc(payload);
  return payload;
});
