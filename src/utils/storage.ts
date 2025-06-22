import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const Storage = {
  setItem(key: string, value: string | object) {
    try {
      const valueToStore =
        typeof value === 'object' ? JSON.stringify(value) : value;
      storage.set(key, valueToStore);
    } catch (error) {
      console.error('MMKV setItem error:', error);
      throw error;
    }
  },

  getItem(key: string) {
    try {
      const value = storage.getString(key);
      if (!value) return null;

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error('MMKV getItem error:', error);
      throw error;
    }
  },

  removeItem(key: string) {
    try {
      storage.delete(key);
    } catch (error) {
      console.error('MMKV removeItem error:', error);
      throw error;
    }
  },

  clear() {
    try {
      storage.clearAll();
    } catch (error) {
      console.error('MMKV clear error:', error);
      throw error;
    }
  },
};

export default Storage;
