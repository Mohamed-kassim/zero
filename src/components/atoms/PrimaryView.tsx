import {StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import useThemeColors, {useThemePreference} from '../../hooks/useThemeColors';

interface PrimaryViewProps {
  children?: ReactNode;
  style?: ViewStyle;
}

const PrimaryView: React.FC<PrimaryViewProps> = ({children, style}) => {
  const colors = useThemeColors();
  const theme = useThemePreference();
  const isDark = theme === 'dark';
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: colors.primaryBackground},
        style,
      ]}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      {children}
    </View>
  );
};

export default PrimaryView;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
});
