import React from 'react';
import {View, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import Swiper from 'react-native-swiper';
import PrimaryText from './PrimaryText';
import useThemeColors from '../../hooks/useThemeColors';

import logger from '../../utils/logger';

const data = [
  {
    id: '1',
    image: require('../../../assets/images/4.webp'),
    text: 'Track your expenses',
  },
  {
    id: '2',
    image: require('../../../assets/images/5.webp'),
    text: 'Analyse your spendings',
  },
  {
    id: '3',
    image: require('../../../assets/images/6.webp'),
    text: 'Track your Borrowings and Lendings',
  },
];

const CarouselItem = ({
  image,
  text,
}: {
  image: ImageSourcePropType;
  text: string;
}) => {
  logger.rerender('CarouselItem');
  return (
    <View style={styles.slide}>
      <Image source={image} style={styles.image} />
      <PrimaryText style={styles.itemText}>{text}</PrimaryText>
    </View>
  );
};
const Carousel = () => {
  logger.rerender('Carousel');
  const colors = useThemeColors();

  return (
    <Swiper
      style={styles.wrapper}
      height={300}
      horizontal={true}
      autoplay
      dot={
        <View style={[styles.dot, {backgroundColor: colors.secondaryAccent}]} />
      }
      activeDot={
        <View
          style={[styles.activeDot, {backgroundColor: colors.primaryText}]}
        />
      }
      paginationStyle={styles.pagination}
      loop>
      {data.map(item => (
        <CarouselItem key={item.id} image={item.image} text={item.text} />
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: '30%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    height: 250,
    width: 200,
    resizeMode: 'contain',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  pagination: {
    bottom: '15%',
    left: 0,
    right: 0,
  },
  itemText: {
    marginTop: '3%',
  },
});

export default Carousel;
