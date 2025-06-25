import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './style';

import PrimaryText from '../../components/atoms/PrimaryText';

import Screen from '../../components/atoms/Screen';
import Button from '../../components/atoms/Button';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import ControlledInput from '../../components/atoms/ControlledInput';
import {CreateUserSchema, createUserSchema} from '../../db/models/User';

import {navigate} from '../../utils/navigationUtils';
import useThemeColors from '../../hooks/useThemeColors';
import {createUser} from '../../db/services/user';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/slices/userSlice';

const PersonalizeScreen = () => {
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  // TODO: user can go back to the previous screen and recreate the user with the same data
  const onSubmit = async (data: CreateUserSchema) => {
    try {
      setIsLoading(true);
      const user = await createUser({
        username: data.username,
        email: data.email,
      });
      dispatch(setUser(user));
      navigate('OnboardingScreen');
    } catch (error) {
      console.error('Error saving user data to Realm:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // TODO: how should we skip if the email is required in the db?

  const onSkip = async () => {
    try {
      setIsLoading(true);
      await createUser({username: 'User', email: 'Test@gmail.com'});
      navigate('OnboardingScreen');
    } catch (error) {
      console.error('Error saving demo user data to Realm:', error);
    } finally {
      setIsLoading(false);
      navigate('OnboardingScreen');
    }
  };

  return (
    <Screen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.contentContainer}>
        <Button
          style={styles.skipButtonContainer}
          variant="ghost"
          title="skip"
          textColor={colors.accentGreen}
          onPress={onSkip}
        />
        <View style={styles.titleContainer}>
          <PrimaryText style={styles.titleText}>
            Let's Personalize your{'\n'}experience
          </PrimaryText>

          <PrimaryText
            style={[styles.subtitleText, {color: colors.accentGreen}]}>
            Hi, It's zer0! What Do Your Friends{'\n'}Call You?
          </PrimaryText>
        </View>
        <ControlledInput
          name="username"
          control={control}
          label={'Name'}
          placeholder={'eg. Mohamed Kassim'}
          accessibilityLabel="Enter your name"
          accessibilityHint="Enter the name that your friends call you"
          accessibilityRole="text"
          autoCapitalize="words"
          autoComplete="username"
          autoCorrect={false}
          returnKeyType="next"
          textContentType="username"
          enablesReturnKeyAutomatically
          editable={!isLoading}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
        <ControlledInput
          name="email"
          control={control}
          label={'Email'}
          placeholder={'eg. Kassim@gmail.com'}
          accessibilityLabel="Enter your email"
          accessibilityHint="Enter the email that you want to use to login"
          accessibilityRole="text"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          returnKeyType="done"
          textContentType="emailAddress"
          keyboardType="email-address"
          enablesReturnKeyAutomatically
          editable={!isLoading}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>

      <Button
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        title={'Continue'}
        style={styles.buttonContainer}
      />
    </Screen>
  );
};

export default PersonalizeScreen;
