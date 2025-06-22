import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import React from 'react';
import PrimaryView from './PrimaryView';
import useThemeColors from '../../hooks/useThemeColors';
import logger from '../../utils/logger';

const CustomLoader: React.FC = () => {
  logger.rerender('CustomLoader');
  const colors = useThemeColors();
  return (
    <PrimaryView
      colors={colors}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../../assets/images/zer0.png')}
        style={styles.image}
      />
      <ActivityIndicator color={colors.primaryText} size={90} />
    </PrimaryView>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    zIndex: 2,
    height: 50,
    width: 50,
  },
});
