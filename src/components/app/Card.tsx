'use strict';
import React, {memo} from 'react';
import {Pressable, PressableProps, StyleSheet, ViewStyle} from 'react-native';
import colors from '../../theme/colors';

const Card = ({
  style,
  selected,
  ...rest
}: {selected?: boolean} & PressableProps) => {
  return (
    <Pressable
      {...rest}
      style={[
        styles.Card,
        style as ViewStyle,
        // {
        //   transform: [
        //     {scale: selected ? 1.01 : 1},
        //     {
        //       translateY: selected ? 5 : 0,
        //     },
        //   ],
        // },
      ]}></Pressable>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: colors.white,
    elevation: 6,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
  },
});

export default memo(Card);
