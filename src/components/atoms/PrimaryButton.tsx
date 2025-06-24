import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PrimaryText from './PrimaryText';
import useThemeColors from '../../hooks/useThemeColors';

interface PrimaryButtonProps {
  onPress(): void;
  buttonTitle: string;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  buttonTitle,
  disabled,
}) => {
  const colors = useThemeColors();
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.touchableButtonContainer,
          {
            backgroundColor: disabled
              ? colors.secondaryText
              : colors.primaryText,
          },
        ]}>
        <PrimaryText style={{color: colors.buttonText, fontSize: 16}}>
          {buttonTitle}
        </PrimaryText>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  touchableButtonContainer: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
