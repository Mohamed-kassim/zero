import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
  ActivityIndicator,
  PressableStateCallbackType,
} from 'react-native';
import React, {useCallback} from 'react';
import PrimaryText from './PrimaryText';
import useThemeColors from '../../hooks/useThemeColors';

interface ButtonProps extends PressableProps {
  onPress(): void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  title,
  disabled,
  style,
  loading = false,
  variant = 'primary',
  ...props
}) => {
  const colors = useThemeColors();
  const pressableStyle = useCallback(
    ({pressed}: PressableStateCallbackType) =>
      [
        styles.button,
        {
          ...(variant === 'primary' && {
            backgroundColor: colors.primaryText,
          }),
          ...(variant === 'secondary' && {
            backgroundColor: colors.secondaryContainerColor,
            borderColor: colors.secondaryAccent,
          }),
        },
        // iOS behavior: opacity change
        Platform.OS === 'ios' && pressed && styles.iosPressed,
        // Android behavior: slight scale and opacity
        Platform.OS === 'android' && pressed && styles.androidPressed,
        disabled && styles.disabled,
        disabled && {
          backgroundColor:
            variant === 'primary'
              ? colors.secondaryText
              : colors.secondaryContainerColor,
        },
        style,
      ] as StyleProp<ViewStyle>,
    [variant, colors, disabled, style],
  );
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        disabled={disabled || loading}
        style={pressableStyle}
        // Android ripple effect
        android_ripple={
          Platform.OS === 'android'
            ? {
                color:
                  variant === 'primary'
                    ? colors.primaryText
                    : colors.secondaryText,
                borderless: false,
              }
            : undefined
        }
        // Accessibility
        accessibilityRole="button"
        accessibilityState={{disabled: disabled || loading, busy: loading}}
        {...props}>
        <View style={styles.buttonContent}>
          {loading && (
            <ActivityIndicator size="small" color={colors.buttonText} />
          )}
          <PrimaryText
            style={[
              styles.buttonText,
              {
                color:
                  variant === 'primary'
                    ? colors.buttonText
                    : colors.primaryText,
              },
            ]}>
            {title}
          </PrimaryText>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
  },
  button: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  iosPressed: {
    opacity: 0.6,
  },
  // Android pressed state
  androidPressed: {
    opacity: 0.8,
    transform: [{scale: 0.98}],
  },
  disabled: {
    elevation: 0,
    shadowOpacity: 0,
  },
});
