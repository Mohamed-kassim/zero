import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';

import Icon from '../../components/atoms/Icons';

import PrimaryText from '../../components/atoms/PrimaryText';

import CurrencySymbolPicker from '../../components/molecules/CurrencySymbolPicker';
import logger from '../../utils/logger';
import personalizeStyles from '../PersonalizeScreen/style';
import Screen from '../../components/atoms/Screen';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import currencies from '../../../assets/jsons/currencies.json';
import useThemeColors from '../../hooks/useThemeColors';
import {useSetIsOnboarded} from '../../redux/slices/isOnboardedSlice';
import {createCurrency} from '../../db/services/CurrencyService';

import {useUserId} from '../../redux/slices/userSlice';

const filterCurrencies = (search: string) => {
  return currencies.filter(currency => {
    return (
      currency.name.toLowerCase().includes(search.toLowerCase()) ||
      currency.code.toLowerCase().includes(search.toLowerCase()) ||
      currency.symbol.toLowerCase().includes(search.toLowerCase()) ||
      currency.symbolNative.toLowerCase().includes(search.toLowerCase())
    );
  });
};
const ChooseCurrencyScreen = () => {
  logger.rerender('ChooseCurrencyScreen');
  const colors = useThemeColors();
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);

  const userId = useUserId();
  const [search, setSearch] = useState('');
  const filteredCurrencies = filterCurrencies(search);

  const handleCurrencySelect = (currency: any) => {
    setSelectedCurrency(currency);
  };

  const setIsOnboarded = useSetIsOnboarded();

  const handleCurrencySubmit = async () => {
    if (selectedCurrency) {
      console.log('second');
      await createCurrency(
        selectedCurrency.code,
        selectedCurrency.symbol,
        selectedCurrency.name,
        Realm.BSON.ObjectID.createFromHexString(userId),
      );

      setIsOnboarded(true);
    }
  };
  return (
    <Screen style={personalizeStyles.container} edges={['top', 'bottom']}>
      <View style={personalizeStyles.contentContainer}>
        <PrimaryText style={personalizeStyles.titleText}>
          Your money,{'\n'}your currency.{'\n'}Pick the one you prefer.
        </PrimaryText>

        <PrimaryText
          style={[personalizeStyles.subtitleText, {color: colors.accentGreen}]}>
          Select your currency
        </PrimaryText>
        <Input
          label="Search"
          value={search}
          onChangeText={setSearch}
          placeholder={'eg. INR'}
          leftAccessory={
            <Icon
              name="search"
              size={20}
              color={colors.primaryText}
              type="Feather"
            />
          }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <CurrencySymbolPicker
            filteredCurrencies={filteredCurrencies}
            selectedCurrency={selectedCurrency}
            handleCurrencySelect={handleCurrencySelect}
          />
        </ScrollView>
      </View>
      <View style={personalizeStyles.buttonContainer}>
        <Button onPress={handleCurrencySubmit} title={'Continue'} />
      </View>
    </Screen>
  );
};

export default ChooseCurrencyScreen;
