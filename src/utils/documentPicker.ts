import {Platform} from 'react-native';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';
import RNFS from 'react-native-fs';

function normalizePath(path: string | undefined) {
  try {
    if (path === undefined) {
      throw console.error('undefined');
    }
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file:';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
      }
      path = decodeURI(path);
      return path;
    }
  } catch (e) {
    console.error({msg: 'Failed to normalize path', data: e});
  }
}

export const types = DocumentPicker.types;

//
export const importFile = async (
  options: DocumentPickerOptions<SupportedPlatforms>,
) => {
  const result = await DocumentPicker.pick(options);

  const {0: res} = result;
  const path = normalizePath(res.uri);
  if (path === undefined) {
    throw console.error('undefined');
  }

  const content = await RNFS.readFile(path, 'utf8');
  return {...res, content};
};

export type JSONFile<T> = DocumentPickerResponse & {
  content: T;
};

export const importJsonFile = async <T>(
  options: DocumentPickerOptions<SupportedPlatforms>,
): Promise<JSONFile<T>> => {
  const file = await importFile(options);
  const jsonData = JSON.parse(file.content);
  return {
    ...file,
    content: jsonData,
  };
};

export const formatFileSize = (size: number) => {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  } else {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  }
};
