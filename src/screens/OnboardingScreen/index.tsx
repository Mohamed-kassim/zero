import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import defaultCategories from '../../../assets/jsons/defaultCategories.json';

import PrimaryText from '../../components/atoms/PrimaryText';
import Icon from '../../components/atoms/Icons';
import Button from '../../components/atoms/Button';
import {navigate} from '../../utils/navigationUtils';
import personalizeStyles from '../PersonalizeScreen/style';
import Screen from '../../components/atoms/Screen';
import Category from '../../db/models/Category';
import useThemeColors from '../../hooks/useThemeColors';
import onboardingStyles from './style';
import {useUser} from '../../redux/slices/userSlice';

import {createBulkCategories} from '../../db/services/category';

type CategoryData = Pick<Category, 'name' | 'icon' | 'color'> & {
  _id: string | Realm.BSON.ObjectId;
};
interface CategoryTileProps extends TouchableOpacityProps {
  category: CategoryData;
  active: boolean;
}
const CategoryTile = (props: CategoryTileProps) => {
  const colors = useThemeColors();
  const {category, active, ...rest} = props;
  return (
    <TouchableOpacity key={String(category._id)} {...rest}>
      <View
        style={[
          styles.categoryContainer,
          {
            backgroundColor: active
              ? `${colors.accentGreen}75`
              : colors.secondaryAccent,
            borderColor: colors.secondaryContainerColor,
          },
        ]}>
        {category.icon !== undefined ? (
          <View style={styles.iconContainer}>
            <Icon
              name={category.icon ?? ''}
              size={20}
              color={category.color ?? ''}
              type="MaterialCommunityIcons"
            />
          </View>
        ) : null}

        <PrimaryText
          style={[
            onboardingStyles.categoryText,
            {
              color: active ? colors.buttonText : colors.primaryText,
            },
          ]}>
          {category.name}
        </PrimaryText>
      </View>
    </TouchableOpacity>
  );
};

const getIsSelected = (
  category: CategoryData,
  selectedCategories: CategoryData[],
) => {
  return selectedCategories.some(item => item._id === category._id);
};

const OnboardingScreen = () => {
  const colors = useThemeColors();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryData[]>(
    [],
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await createBulkCategories(
        selectedCategories.map(category => ({
          name: category.name,
          color: category.color,
          userId: user?._id,
          icon: category.icon,
        })),
      );

      navigate('ChooseCurrencyScreen');
    } catch (error) {
      console.log('error in createBulkCategories', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategorySelection = (category: CategoryData) => {
    if (getIsSelected(category, selectedCategories)) {
      setSelectedCategories(prev =>
        prev.filter(item => item._id !== category._id),
      );
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };
  const onSkip = async () => {
    navigate('ChooseCurrencyScreen');
  };
  return (
    <Screen style={personalizeStyles.container} edges={['top', 'bottom']}>
      <View style={personalizeStyles.contentContainer}>
        <Button
          style={personalizeStyles.skipButtonContainer}
          variant="ghost"
          title="skip"
          textColor={colors.accentGreen}
          onPress={onSkip}
        />

        <PrimaryText style={personalizeStyles.titleText}>
          Default categories are{'\n'}here
        </PrimaryText>

        <PrimaryText
          style={[personalizeStyles.subtitleText, {color: colors.accentGreen}]}>
          Select your categories you want track
        </PrimaryText>

        <View style={styles.categoryMainContainer}>
          {defaultCategories?.map(category => (
            <CategoryTile
              key={String(category._id)}
              category={category}
              active={getIsSelected(category, selectedCategories)}
              onPress={() => toggleCategorySelection(category)}
            />
          ))}
        </View>
      </View>
      <View style={personalizeStyles.buttonContainer}>
        <Button
          variant="primary"
          onPress={handleSubmit}
          title={'Continue'}
          loading={isLoading}
        />
      </View>
    </Screen>
  );
};

export default OnboardingScreen;
