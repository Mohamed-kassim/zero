import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';
import AsyncStorageService from '../utils/asyncStorageService';
import {
  selectIsOnboarded,
  setIsOnboarded,
} from '../redux/slice/isOnboardedSlice';
import HomeStack from './HomeStack';
import OnboardingStack from './OnboardingStack';
import useThemeColors from '../hooks/useThemeColors';
import CustomLoader from '../components/atoms/CustomLoader';
import logger from '../utils/logger';

const MainStack = () => {
  logger.rerender('MainStack');
  const dispatch = useDispatch();
  const colors = useThemeColors();
  const isOnboarded = useSelector(selectIsOnboarded);
  console.log('🚀 ~ MainStack ~ isOnboarded:', isOnboarded);
  const [isLoading, setIsLoading] = useState(true);
  console.log('🚀 ~ MainStack ~ isLoading:', isLoading);

  useEffect(() => {
    const getIsOnboarded = async () => {
      try {
        const value = await AsyncStorageService.getItem('isOnboarded');
        const isOnboarded = JSON.parse(value);
        console.log(
          'this is the value of isOnboarded',
          typeof isOnboarded,
          isOnboarded,
          value,
        );
        if (isOnboarded) {
          dispatch(setIsOnboarded(true));
          console.log('Fetched isOnboarded from AsyncStorage');
        } else {
          dispatch(setIsOnboarded(false));
          console.log('Fetched isOnboarded from AsyncStorage');
        }
      } catch (error) {
        console.error('Error getting isOnboarded:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getIsOnboarded();
  }, [isOnboarded, dispatch]);

  if (isLoading) {
    return <CustomLoader colors={colors} />;
  }

  if (!isOnboarded) {
    return <OnboardingStack />;
  }
  return <HomeStack />;
};

export default MainStack;
