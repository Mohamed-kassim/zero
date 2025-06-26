import {StyleSheet} from 'react-native';

const existingUserStyles = StyleSheet.create({
  titleTextContainer: {
    paddingTop: '10%',
  },
  uploadContainer: {
    flexDirection: 'row',

    marginRight: 5,
  },
  importButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  importIconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },
  importButtonContent: {
    flex: 1,
  },
  importButtonLoadingContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importButtonText: {
    fontSize: 13,
  },
  syncEntityButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    height: 65,
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  syncEntityButtonContent: {
    flex: 1,
  },
  syncEntityButtonLeftContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  individualSettingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 65,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default existingUserStyles;
