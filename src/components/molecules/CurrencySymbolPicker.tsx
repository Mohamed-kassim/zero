import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import useThemeColors from '../../hooks/useThemeColors';
import PrimaryText from '../atoms/PrimaryText';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import logger from '../../utils/logger';

interface Currency {
  name: string;
  symbol: string;
  symbolNative: string;
  decimalDigits: number;
  rounding: number;
  code: string;
  namePlural: string;
}

interface CurrenciesPickerProps {
  currencies: Array<Currency>;
  selectedCurrency: Partial<Currency> | null;
  handleCurrencySelect: (currency: Currency) => void;
}

const ITEM_SIZE = 100;

const CurrencyItem = React.memo(
  (props: {
    currency: Currency;
    selectedCurrency: Partial<Currency> | null;
    handleCurrencySelect: (currency: Currency) => void;
  }) => {
    logger.rerender('CurrencyItem');
    const colors = useThemeColors();
    const {currency, selectedCurrency, handleCurrencySelect} = props;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            backgroundColor:
              selectedCurrency?.code === currency.code
                ? `${colors.accentGreen}75`
                : colors.secondaryAccent,
            borderColor: colors.secondaryContainerColor,
          },
        ]}
        key={currency.code}
        onPress={() => handleCurrencySelect(currency)}>
        <View style={styles.symbolContainer}>
          <PrimaryText style={[styles.symbolText, {color: colors.primaryText}]}>
            {currency.symbolNative}
          </PrimaryText>
          <PrimaryText style={[styles.codeText, {color: colors.primaryText}]}>
            {currency.code}
          </PrimaryText>
        </View>
        <PrimaryText style={[styles.nameText, {color: colors.primaryText}]}>
          {currency.name}
        </PrimaryText>
      </TouchableOpacity>
    );
  },
);
const CurrenciesPicker = (props: CurrenciesPickerProps) => {
  const {currencies, selectedCurrency, handleCurrencySelect} = props;

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Currency>) => {
      return (
        <CurrencyItem
          currency={item}
          selectedCurrency={selectedCurrency}
          handleCurrencySelect={handleCurrencySelect}
        />
      );
    },
    [selectedCurrency, handleCurrencySelect],
  );
  return (
    <FlashList
      data={currencies}
      numColumns={3}
      estimatedItemSize={ITEM_SIZE}
      keyExtractor={item => item.code}
      renderItem={renderItem}
    />
  );
};
export default CurrenciesPicker;
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 5,
    borderWidth: 2,
    margin: 2,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  symbolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 20,
  },
  codeText: {
    fontSize: 13,
  },
  nameText: {
    fontSize: 10,
  },
  columnWrapper: {
    backgroundColor: 'red',
  },
  contentContainer: {
    backgroundColor: 'blue',
  },
});
