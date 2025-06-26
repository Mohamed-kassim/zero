import {View} from 'react-native';
import React, {useCallback, useState} from 'react';

import Icon from '../../components/atoms/Icons';

import PrimaryText from '../../components/atoms/PrimaryText';

import CurrenciesPicker from '../../components/molecules/CurrencySymbolPicker';
import logger from '../../utils/logger';
import personalizeStyles from '../PersonalizeScreen/style';
import Screen from '../../components/atoms/Screen';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import currencies from '../../../assets/jsons/currencies.json';
import useThemeColors from '../../hooks/useThemeColors';
import {useSetIsOnboarded} from '../../redux/slices/isOnboardedSlice';
import {createCurrency} from '../../db/services/currency';
import Realm from 'realm';
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
  const [isLoading, setIsLoading] = useState(false);
  const userId = useUserId();
  const [search, setSearch] = useState('');
  const filteredCurrencies = filterCurrencies(search);

  const handleCurrencySelect = useCallback(
    (currency: any) => {
      setSelectedCurrency(currency);
    },
    [setSelectedCurrency],
  );

  const setIsOnboarded = useSetIsOnboarded();

  const handleCurrencySubmit = async () => {
    try {
      if (selectedCurrency) {
        setIsLoading(true);
        await createCurrency({
          code: selectedCurrency.code,
          symbol: selectedCurrency.symbol,
          name: selectedCurrency.name,
          userId: Realm.BSON.ObjectId.createFromHexString(userId ?? ''),
        });
        setIsLoading(false);

        setIsOnboarded(true);
      }
    } catch (error) {
      console.log('error in handleCurrencySubmit', error);
    } finally {
      setIsLoading(false);
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
        <CurrenciesPicker
          currencies={filteredCurrencies}
          selectedCurrency={selectedCurrency}
          handleCurrencySelect={handleCurrencySelect}
        />
      </View>
      <View style={personalizeStyles.buttonContainer}>
        <Button
          onPress={handleCurrencySubmit}
          title={'Continue'}
          loading={isLoading}
        />
      </View>
    </Screen>
  );
};

export default ChooseCurrencyScreen;
