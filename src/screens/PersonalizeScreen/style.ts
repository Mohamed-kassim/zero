import {StyleSheet} from 'react-native';

export const personalizeStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    gap: 20,
    flex: 1,
  },
  titleText: {
    fontSize: 24,
  },
  titleContainer: {
    gap: 10,
  },
  subtitleText: {
    fontSize: 15,
  },
  textInput: {
    height: 60,
    borderWidth: 2,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
    fontFamily: 'FiraCode-Medium',
    includeFontPadding: false,
  },
  textInputContainer: {
    marginBottom: '90%',
  },
  skipButtonContainer: {
    alignSelf: 'flex-end',
    paddingTop: '5%',
  },
  buttonContainer: {
    marginBottom: '5%',
  },
});

export default personalizeStyles;
