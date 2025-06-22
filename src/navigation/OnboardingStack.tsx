import React, {useEffect} from 'react';
import SplashScreen from '../screens/SplashScreen';
import PersonalizeScreen from '../screens/PersonalizeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import ChooseCurrencyScreen from '../screens/ChooseCurrencyScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ExistingUserScreen from '../screens/ExistingUserScreen';
import {bootTimeMeasurement} from '../utils/bootTimeMeasurement';
import logger from '../utils/logger';

const screenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  logger.rerender('OnboardingStack');
  useEffect(() => {
    bootTimeMeasurement.finish();
  }, []);
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="ExistingUserScreen" component={ExistingUserScreen} />
      <Stack.Screen name="PersonalizeScreen" component={PersonalizeScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen
        name="ChooseCurrencyScreen"
        component={ChooseCurrencyScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
