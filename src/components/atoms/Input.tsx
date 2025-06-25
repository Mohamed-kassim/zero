import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {forwardRef} from 'react';
import PrimaryText from './PrimaryText';

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

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftAccessory?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = forwardRef<TextInput, InputProps>(
  ({label, error, leftAccessory, containerStyle, ...props}, ref) => {
    const colors = useThemeColors();

    return (
      <View style={styles.container}>
        {label ? <Label label={label} /> : null}
        <View style={[styles.inputContainer, containerStyle]}>
          {leftAccessory && (
            <View style={styles.leftAccessoryContainer}>{leftAccessory}</View>
          )}
          <TextInput
            ref={ref}
            style={[
              styles.textInput,
              leftAccessory ? styles.inputWithLeftAccessory : {},
              {
                borderColor: colors.secondaryContainerColor,
                color: colors.primaryText,
                backgroundColor: colors.secondaryAccent,
              },
            ]}
            cursorColor={colors.accentGreen}
            placeholderTextColor={colors.secondaryText}
            {...props}
          />
        </View>
        {error ? <Error error={error} style={styles.error} /> : null}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    fontFamily: 'FiraCode-Medium',
    includeFontPadding: false,
    flex: 1,
    width: '100%',
  },
  container: {
    gap: 5,
  },
  error: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAccessoryContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  inputWithLeftAccessory: {
    paddingLeft: 50,
  },
});
