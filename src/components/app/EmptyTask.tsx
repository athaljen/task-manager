'use strict';
import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text500} from '../common/Texts';
import {Icons} from '../../assets';

type Props = {
  message?: string;
};

const EmptyTask = ({message}: Props) => {
  return (
    <View style={styles.EmptyTask}>
      <Image source={Icons.empty} style={styles.icon} resizeMode="contain" />
      <Text500>{message || 'No Task found!'}</Text500>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyTask: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    gap: 10,
  },
  icon: {width: 200, height: 200},
});

export default memo(EmptyTask);
