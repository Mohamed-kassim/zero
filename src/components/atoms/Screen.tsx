import {StatusBar, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode, useMemo} from 'react';
import useThemeColors, {useThemePreference} from '../../hooks/useThemeColors';
import {
  Edge,
  EdgeInsets,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface ScreenProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
}

const getPadding = (edges: Edge[], insets: EdgeInsets) => {
  return {
    ...(edges?.includes('top') && {paddingTop: insets.top}),
    ...(edges?.includes('bottom') && {paddingBottom: insets.bottom}),
    ...(edges?.includes('left') && {paddingLeft: insets.left}),
    ...(edges?.includes('right') && {paddingRight: insets.right}),
  };
};
// TODO: add option to have keyboard scrollable screen

const Screen: React.FC<ScreenProps> = ({children, style, edges}) => {
  const colors = useThemeColors();
  const theme = useThemePreference();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const padding = useMemo(() => {
    return getPadding(edges || [], insets);
  }, [edges, insets]);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: colors.primaryBackground,
          ...padding,
        },
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

export default Screen;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
});
