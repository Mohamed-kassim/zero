import React from 'react';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import useSplash from './useSplash';
import PrimaryView from '../../components/atoms/PrimaryView';
import PrimaryText from '../../components/atoms/PrimaryText';
import {View} from 'react-native';
import {styles} from './styles';

const SplashScreen = () => {
  const {handleClick, colors} = useSplash();

  return (
    <PrimaryView colors={colors} style={styles.container}>
      <View>
        <PrimaryText style={styles.title}>zer0</PrimaryText>
        <PrimaryText style={[{color: colors.secondaryText}, styles.subtitle]}>
          Count Every {'\n'}Penny with zer0
        </PrimaryText>
      </View>
      <PrimaryButton
        onPress={handleClick}
        colors={colors}
        buttonTitle={'Get Started'}
      />
    </PrimaryView>
  );
};

export default SplashScreen;
