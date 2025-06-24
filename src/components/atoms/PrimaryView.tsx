import {StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import useThemeColors from '../../hooks/useThemeColors';

interface PrimaryViewProps {
  children?: ReactNode;
  style?: ViewStyle;
}

const PrimaryView: React.FC<PrimaryViewProps> = ({children, style}) => {
  const colors = useThemeColors();
  const isDark = colors.primaryBackground === '#0F0F0F';
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
