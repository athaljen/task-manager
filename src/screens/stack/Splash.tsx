'use strict';
import React, {memo, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ScreenProps} from '../../navigation/navigation.types';
import {Icons} from '../../assets';
import {Text600} from '../../components/common/Texts';
import colors from '../../theme/colors';

const Splash = ({navigation}: ScreenProps<'Splash'>) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 2500);
  }, [navigation]);

  return (
    <View style={styles.Splash}>
      <Image source={Icons.icon} style={styles.icon} />
      <Text600 style={styles.title}>Task Manager</Text600>
    </View>
  );
};

const styles = StyleSheet.create({
  Splash: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  icon: {width: 200, height: 200},
  title: {fontSize: 20, position: 'absolute', bottom: 50, color: colors.blue},
});

export default memo(Splash);
