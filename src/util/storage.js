import {AsyncStorage} from 'react-native';

export async function setItem (key, value) {
  return await AsyncStorage.setItem(key, JSON.stringify(value || '{}'));
}

export function getItem (key) {
  return AsyncStorage.getItem(key)
    .then(function (value) {
      return JSON.parse(value || '{}');
    });
}

export function setState (value) {
  return setItem('$state', value);
}

export function getState () {
  return getItem('$state');
}

export const clear = AsyncStorage.clear;

export async function removeItem (...args) {
  return await AsyncStorage.removeItem(...args);
}

export function multiGet (keys) {
  return AsyncStorage.multiGet(keys)
    .then(results => {
      return results.map(item => {
        return [item[0], JSON.parse(item[1])];
      });
    });
}

export function multiRemove (keys) {
  return AsyncStorage.multiRemove(keys);
}
