import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import colors from '../../theme/colors';

export const Text400: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[styles.Text400, props.style]}>
      {props.children}
    </Text>
  );
};

export const Text500: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[styles.Text500, props.style]}>
      {props.children}
    </Text>
  );
};

export const Text600: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[styles.Text600, props.style]}>
      {props.children}
    </Text>
  );
};

export const Text700: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[styles.Text700, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  Text400: {
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    includeFontPadding: false,
  },
  Text500: {
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    includeFontPadding: false,
  },
  Text600: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    includeFontPadding: false,
  },
  Text700: {
    fontFamily: 'Poppins-Bold',
    color: colors.black,
    includeFontPadding: false,
  },
});
