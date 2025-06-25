import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Dimensions,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PrimaryText from '../atoms/PrimaryText';
import useThemeColors from '../../hooks/useThemeColors';

import logger from '../../utils/logger';
import {useSharedValue} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

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
const width = Dimensions.get('window').width * 0.8;

interface CarouselItemProps {
  item: {
    image: ImageSourcePropType;
    text: string;
  };
}
const CarouselItem = React.memo(({item}: CarouselItemProps) => {
  logger.rerender('CarouselItem');
  const {image, text} = item;
  return (
    <View style={styles.slide}>
      <Image source={image} style={styles.image} />
      <PrimaryText style={styles.itemText}>{text}</PrimaryText>
    </View>
  );
});
const renderItem = ({item}: {item: any}) => {
  return <CarouselItem item={item} />;
};

const OnboardingCarousel = () => {
  logger.rerender('OnboardingCarousel');
  const ref = React.useRef<ICarouselInstance>(null);

  const colors = useThemeColors();
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View style={styles.wrapper}>
      <Carousel
        ref={ref}
        width={width}
        height={300}
        data={data}
        autoPlay={true}
        onProgressChange={progress}
        renderItem={renderItem}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{...styles.dot, backgroundColor: colors.secondaryAccent}}
        activeDotStyle={{backgroundColor: colors.primaryText}}
        containerStyle={styles.containerStyle}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  dot: {
    borderRadius: 50,
  },
  containerStyle: {
    gap: 5,
    marginTop: 10,
  },

  itemText: {
    marginTop: '3%',
  },
});

export default OnboardingCarousel;
