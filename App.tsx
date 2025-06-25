import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {setNavigationRef} from './src/utils/navigationUtils';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import MainStack from './src/navigation/MainStack';
import {LogBox} from 'react-native';
import {bootTimeMeasurement} from './src/utils/bootTimeMeasurement';
import {PersistGate} from 'redux-persist/integration/react';
import CustomLoader from './src/components/atoms/CustomLoader';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<CustomLoader />}
          persistor={persistor}
          onBeforeLift={() => {
            bootTimeMeasurement.markReduxInitialized();
          }}>
          <NavigationContainer
            ref={setNavigationRef}
            onReady={() => {
              bootTimeMeasurement.markNavigationInitialized();
            }}>
            <MainStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
