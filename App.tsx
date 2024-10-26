'use strict';
import React, {memo} from 'react';
import {StatusBar, Text, TextInput, View} from 'react-native';
import RootNav from './src/navigation/RootNav';
import colors from './src/theme/colors';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import gs from './src/theme/gs';
import {SafeAreaProvider} from 'react-native-safe-area-context';

console.warn = () => {};

//force disable font scaling
if ((Text as any).defaultProps) {
  (Text as any).defaultProps.allowFontScaling = false;
} else {
  (Text as any).defaultProps = {};
  (Text as any).defaultProps.allowFontScaling = false;
}

//force disable font scaling
if ((TextInput as any).defaultProps) {
  (TextInput as any).defaultProps.allowFontScaling = false;
} else {
  (TextInput as any).defaultProps = {};
  (TextInput as any).defaultProps.allowFontScaling = false;
}

const App = () => {
  return (
    <SafeAreaProvider style={gs.flex1}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <AlertNotificationRoot theme="light" dialogConfig={{autoClose: true}}>
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <RootNav />
          </Provider>
        </PersistGate>
      </AlertNotificationRoot>
    </SafeAreaProvider>
  );
};

export default memo(App);
