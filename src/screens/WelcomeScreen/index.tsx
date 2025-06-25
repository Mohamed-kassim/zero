import {Text, View} from 'react-native';
import React, {useState} from 'react';
import PrimaryView from '../../components/atoms/PrimaryView';
import PrimaryText from '../../components/atoms/PrimaryText';

import Carousel from '../../components/atoms/Carousel';
import {styles} from './styles';
import useThemeColors from '../../hooks/useThemeColors';
import {deleteAllData} from '../../services/DeleteService';
import {navigate} from '../../utils/navigationUtils';
import Button from '../../components/atoms/Button';
import OnboardingCarousel from '../../components/molecules/OnboardingCarousel';

const WelcomeScreen = () => {
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);

  const handleExistingUser = async () => {
    setIsLoading(true);
    await deleteAllData();
    setIsLoading(false);
    navigate('ExistingUserScreen');
  };

  const handleNewUser = async () => {
    setIsLoading(true);
    await deleteAllData();
    setIsLoading(false);
    navigate('PersonalizeScreen');
  };

  return (
    <PrimaryView style={styles.container}>
      <View style={styles.titleContainer}>
        <PrimaryText style={styles.title}>
          Welcome to <Text style={{color: colors.accentGreen}}>zero</Text>
        </PrimaryText>
      </View>

      <OnboardingCarousel />

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          onPress={handleExistingUser}
          title={'Existing User'}
          loading={isLoading}
        />
        <PrimaryText style={styles.orText}>or</PrimaryText>
        <Button
          variant="secondary"
          onPress={handleNewUser}
          title={'New User'}
          loading={isLoading}
        />
      </View>
    </PrimaryView>
  );
};

export default WelcomeScreen;
