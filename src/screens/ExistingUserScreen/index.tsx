import {
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PrimaryText from '../../components/atoms/PrimaryText';
import Icon from '../../components/atoms/Icons';

import CustomToast from '../../components/molecules/CustomToast';
import styles from './style';

import Screen from '../../components/atoms/Screen';
import personalizeStyles from '../PersonalizeScreen/style';
import Button from '../../components/atoms/Button';
import {
  formatFileSize,
  importJsonFile,
  JSONFile,
  types,
} from '../../utils/documentPicker';
import {requestStoragePermission} from '../../utils/dataUtils';

import logger from '../../utils/logger';
import {
  DBFile,
  dbFileSchema,
  restoreDatabaseData,
} from '../../db/services/core';
import useThemeColors from '../../hooks/useThemeColors';
import {setUser} from '../../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import {setIsOnboarded} from '../../redux/slices/isOnboardedSlice';

interface ImportButtonProps {
  file: JSONFile<DBFile> | null;
  setFile: (file: JSONFile<DBFile> | null) => void;
}

const ImportButton = (props: ImportButtonProps) => {
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);
  const {file, setFile} = props;
  const [isStorageModalVisible, setIsStorageModalVisible] = useState(false);

  const handleAccessStorageOk = async () => {
    Linking.openSettings();
  };
  const handleAccessStorageCancel = () => {
    setIsStorageModalVisible(false);
  };

  const importDBData = async () => {
    try {
      setFile(null);
      setIsLoading(true);
      const storagePermissionGranted = await requestStoragePermission();

      if (!storagePermissionGranted) {
        console.log('Storage permission denied.');
        setIsStorageModalVisible(true);
        return;
      }
      const jsonFile = await importJsonFile<DBFile>({
        type: [types.allFiles],
        allowMultiSelection: false,
      });

      await dbFileSchema.parseAsync(jsonFile.content);

      setFile(jsonFile);
    } catch (error) {
      setFile(null);
      console.error('Error picking or reading file:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <TouchableOpacity
        style={styles.importButtonContainer}
        onPress={importDBData}>
        <View
          style={[
            styles.importIconContainer,
            {
              backgroundColor: colors.secondaryAccent,
              borderColor: colors.secondaryContainerColor,
            },
          ]}>
          <Icon
            name={'file-upload'}
            size={25}
            color={colors.accentGreen}
            type={'MaterialCommunityIcons'}
          />
        </View>
        <View style={styles.importButtonContent}>
          {!file ? (
            <PrimaryText style={styles.importButtonText}>
              import your file
            </PrimaryText>
          ) : (
            <View>
              <PrimaryText style={styles.importButtonText}>
                {file.name} {file.size ? `(${formatFileSize(file.size)})` : ''}
              </PrimaryText>
              <PrimaryText
                style={[styles.importButtonText, {color: colors.accentOrange}]}>
                press to reimport
              </PrimaryText>
            </View>
          )}
        </View>
        {isLoading && (
          <View style={styles.importButtonLoadingContainer}>
            <ActivityIndicator size="small" color={colors.accentGreen} />
          </View>
        )}
      </TouchableOpacity>
      <CustomToast
        visible={isStorageModalVisible}
        message={
          'You need to manually give permission for the storage to import your data'
        }
        type="warning"
        onOk={handleAccessStorageOk}
        onCancel={handleAccessStorageCancel}
      />
    </>
  );
};

interface toggleSyncEntityButtonProps
  extends Omit<TouchableOpacityProps, 'onPress'> {
  title: string;
  icon: string;
  shouldSync: boolean;
  setShouldSync: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SyncEntityButton = (props: toggleSyncEntityButtonProps) => {
  const {
    icon,
    shouldSync,
    disabled,
    title,

    setShouldSync,

    ...rest
  } = props;
  const {colors} = useExistingUser();
  const toggleShouldSync = () => {
    setShouldSync(prev => !prev);
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.syncEntityButtonContainer,
        {
          backgroundColor: shouldSync
            ? colors.accentGreen
            : colors.containerColor,
          borderColor: colors.secondaryContainerColor,
        },
      ]}
      onPress={toggleShouldSync}
      {...rest}>
      <Icon
        name={icon}
        size={25}
        color={shouldSync ? colors.buttonText : colors.primaryText}
        type={'MaterialCommunityIcons'}
      />
      <View style={styles.syncEntityButtonContent}>
        <PrimaryText
          style={{
            color: shouldSync ? colors.buttonText : colors.primaryText,
          }}>
          {title}
        </PrimaryText>
      </View>
      {shouldSync && (
        <View style={styles.syncEntityButtonLeftContainer}>
          <Icon
            name="check"
            size={25}
            color={colors.buttonText}
            type={'MaterialCommunityIcons'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
const ExistingUserScreen = () => {
  logger.rerender('ExistingUserScreen');
  const colors = useThemeColors();

  const [isLoading, setIsLoading] = useState(false);
  const [shouldSyncExpense, setShouldSyncExpense] = useState(false);
  const [shouldSyncDebt, setShouldSyncDebt] = useState(false);

  const dispatch = useDispatch();
  const [file, setFile] = useState<JSONFile<DBFile> | null>(null);

  const handleStartImport = async () => {
    try {
      if (!file) {
        return;
      }
      setIsLoading(true);
      const data = file.content.data;
      const dataToBeRestored = {
        ...data,
        expenses: shouldSyncExpense ? data?.expenses : [],
        debts: shouldSyncDebt ? data?.debts : [],
      };
      const restoredData = await restoreDatabaseData({
        key: file.content.key,
        data: dataToBeRestored,
      });
      dispatch(setUser(restoredData.user));
      dispatch(setIsOnboarded(true));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Screen style={personalizeStyles.container} edges={['top', 'bottom']}>
      <View style={personalizeStyles.contentContainer}>
        <PrimaryText style={personalizeStyles.titleText}>
          As an existing user if you have exported your data,
        </PrimaryText>
        <PrimaryText
          style={[personalizeStyles.subtitleText, {color: colors.accentGreen}]}>
          Import your zero***.json file we will assess your data
        </PrimaryText>
        <ImportButton file={file} setFile={setFile} />

        {!!file && (
          <>
            <SyncEntityButton
              title="Sync Expense Data"
              icon="database-sync"
              shouldSync={shouldSyncExpense}
              setShouldSync={setShouldSyncExpense}
            />
            <SyncEntityButton
              title="Sync Debt Data"
              icon="credit-card-sync-outline"
              shouldSync={shouldSyncDebt}
              setShouldSync={setShouldSyncDebt}
            />
          </>
        )}
      </View>

      <View style={personalizeStyles.buttonContainer}>
        <Button
          onPress={handleStartImport}
          title={'Start Importing'}
          // disabled={!file || isLoading}
          loading={isLoading}
        />
      </View>
    </Screen>
  );
};

export default ExistingUserScreen;
