'use strict';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {};
const DashBoardScreen = (props: Props) => {
  return <View style={styles.DashBoardScreen}></View>;
};

const styles = StyleSheet.create({
  DashBoardScreen: {flex: 1},
});

export default memo(DashBoardScreen);
