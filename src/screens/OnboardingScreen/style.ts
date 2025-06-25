import {StyleSheet} from 'react-native';

const onboardingStyles = StyleSheet.create({
  categoryText: {
    fontSize: 13,
  },
  categoryContainer: {
    height: 45,
    padding: 10,
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  categoryMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addButton: {
    height: 45,
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 2,
    width: 50,
    alignSelf: 'flex-end',
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: '60%',
  },
  iconContainer: {
    marginRight: 5,
  },
});

export default onboardingStyles;
