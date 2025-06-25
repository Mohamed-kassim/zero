import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import React from 'react';
import PrimaryText from './PrimaryText';
import textInputStyles from '../../styles/textInput';
import useThemeColors from '../../hooks/useThemeColors';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const Label = ({
  label,
  style,
}: {
  label: string;
  style?: StyleProp<TextStyle>;
}) => {
  return <PrimaryText style={style}>{label}</PrimaryText>;
};

const Error = ({
  error,
  style,
}: {
  error: string;
  style?: StyleProp<TextStyle>;
}) => {
  const colors = useThemeColors();
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <PrimaryText style={[styles.error, {color: colors.accentRed}, style]}>
        {error}
      </PrimaryText>
    </Animated.View>
  );
};
interface InputProps extends TextInputProps {
  label?: string;

  errors: string[];
}
const Input: React.FC<InputProps> = ({label, errors = [], ...props}) => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      {label ? <Label label={label} /> : null}
      <TextInput
        style={[
          textInputStyles.textInput,
          {
            borderColor: colors.secondaryContainerColor,
            color: colors.primaryText,
            backgroundColor: colors.secondaryAccent,
          },
        ]}
        placeholderTextColor={colors.secondaryText}
        {...props}
      />
      {errors.length > 0 &&
        errors.map((error: string) => (
          <Error key={error} error={error} style={styles.error} />
        ))}
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    fontFamily: 'FiraCode-Medium',
    includeFontPadding: false,
  },
  container: {
    gap: 5,
  },
  error: {
    fontSize: 12,
  },
});
