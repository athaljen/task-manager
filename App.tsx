'use strict';
import React, {memo} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RootNav from './src/navigation/RootNav';
import colors from './src/theme/colors';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store';
import {PersistGate} from 'redux-persist/es/integration/react';

console.warn = () => {};

const App = () => {
  return (
    <View style={styles.App}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <RootNav />
        </Provider>
      </PersistGate>
    </View>
  );
};

const styles = StyleSheet.create({
  App: {flex: 1},
});

export default memo(App);
