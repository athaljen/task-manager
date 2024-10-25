'use strict';
import React, {memo} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RootNav from './src/navigation/RootNav';
import colors from './src/theme/colors';

console.warn = () => {};

const App = () => {
  return (
    <View style={styles.App}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <RootNav />
    </View>
  );
};

const styles = StyleSheet.create({
  App: {flex: 1},
});

export default memo(App);
