import {Text, View} from 'react-native';
import React from 'react';
import PrimaryView from '../../components/atoms/PrimaryView';
import PrimaryText from '../../components/atoms/PrimaryText';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import Carousel from '../../components/atoms/Carousel';
import {styles} from './styles';
import useThemeColors from '../../hooks/useThemeColors';
import {deleteAllData} from '../../services/DeleteService';
import {navigate} from '../../utils/navigationUtils';

const WelcomeScreen = () => {
  const colors = useThemeColors();

  const handleExistingUser = async () => {
    await deleteAllData();
    navigate('ExistingUserScreen');
  };

  const handleNewUser = async () => {
    await deleteAllData();
    navigate('PersonalizeScreen');
  };

  return (
    <PrimaryView style={styles.container}>
      <View style={styles.titleContainer}>
        <PrimaryText style={styles.title}>
          Welcome to <Text style={{color: colors.accentGreen}}>zero</Text>
        </PrimaryText>
      </View>

      <Carousel />

      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={handleExistingUser}
          buttonTitle={'Existing User'}
          disabled={undefined}
        />
        <PrimaryText style={styles.orText}>or</PrimaryText>
        <PrimaryButton
          onPress={handleNewUser}
          buttonTitle={'New User'}
          disabled={undefined}
        />
      </View>
    </PrimaryView>
  );
};

export default WelcomeScreen;
