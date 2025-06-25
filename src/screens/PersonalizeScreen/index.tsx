import {View} from 'react-native';
import React from 'react';
import styles from './style';

import PrimaryText from '../../components/atoms/PrimaryText';

import Screen from '../../components/atoms/Screen';
import Button from '../../components/atoms/Button';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import ControlledInput from '../../components/atoms/ControlledInput';
import {
  PersonalizationFormSchema,
  personalizationFormSchema,
} from '../../utils/validationSchema';
import {createUser} from '../../services/UserService';
import {navigate} from '../../utils/navigationUtils';
import useThemeColors from '../../hooks/useThemeColors';

const PersonalizeScreen = () => {
  const colors = useThemeColors();
  const {control, handleSubmit} = useForm<PersonalizationFormSchema>({
    resolver: zodResolver(personalizationFormSchema),
  });
  const email = 'null';

  const onSubmit = async (data: PersonalizationFormSchema) => {
    try {
      // await nameSchema.parseAsync({name});
      await createUser(data.name, email);
      navigate('OnboardingScreen');
    } catch (error) {
      console.error('Error saving user data to Realm:', error);
    }
  };

  const onSkip = async () => {
    try {
      await createUser('User', email);
      navigate('OnboardingScreen');
    } catch (error) {
      console.error('Error saving demo user data to Realm:', error);
    }
    navigate('OnboardingScreen');
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
          name="name"
          control={control}
          label={'Name'}
          placeholder={'eg. Indranil Bhuin'}
          accessibilityLabel="Enter your name"
          accessibilityHint="Enter the name that your friends call you"
          accessibilityRole="text"
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect={false}
          returnKeyType="done"
          textContentType="name"
          enablesReturnKeyAutomatically
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        title={'Continue'}
        style={styles.buttonContainer}
      />
    </Screen>
  );
};

export default PersonalizeScreen;
