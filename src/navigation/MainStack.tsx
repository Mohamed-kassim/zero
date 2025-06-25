import {useSelector} from 'react-redux';
import React from 'react';
import {selectIsOnboarded} from '../redux/slices/isOnboardedSlice';
import HomeStack from './HomeStack';
import OnboardingStack from './OnboardingStack';

import logger from '../utils/logger';

const MainStack = () => {
  logger.rerender('MainStack');

  const isOnboarded = useSelector(selectIsOnboarded);

  if (!isOnboarded) {
    return <OnboardingStack />;
  }
  return <HomeStack />;
};

export default MainStack;
