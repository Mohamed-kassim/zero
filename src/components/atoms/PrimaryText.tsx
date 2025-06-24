import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import useThemeColors from '../../hooks/useThemeColors';

interface PrimaryTextProps {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}

const PrimaryText: React.FC<PrimaryTextProps> = ({children, style}) => {
  const colors = useThemeColors();
  return (
    <Text style={[styles.primaryText, {color: colors.primaryText}, style]}>
      {children}
    </Text>
  );
};

export default PrimaryText;

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: 'FiraCode-Medium',
    includeFontPadding: false,
    fontSize: 14,
  },
});
