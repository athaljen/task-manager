'use strict';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';

const FloatingLabelInput = (
  props: TextInputProps & {
    ViewStyle?: StyleProp<ViewStyle>;
    TextStyle?: StyleProp<TextStyle>;
  },
) => {
  const {
    ViewStyle,
    TextStyle,
    placeholder,
    value,
    defaultValue,
    style,
    secureTextEntry,
    ...others
  } = props;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value || defaultValue) {
      Animated.timing(animation, {
        useNativeDriver: false,
        duration: 200,
        toValue: 1,
      }).start();
    }
  }, [value, defaultValue]);

  const handleFocus = useCallback(() => {
    Animated.timing(animation, {
      useNativeDriver: false,
      duration: 200,
      toValue: 1,
    }).start();
  }, [animation]);

  const handleBlur = useCallback(() => {
    if (!value && !defaultValue) {
      Animated.timing(animation, {
        useNativeDriver: false,
        duration: 200,
        toValue: 0,
      }).start();
    }
  }, [animation, value, defaultValue]);

  return (
    <View style={[styles.FloatingLabelInput, ViewStyle]}>
      <Animated.Text
        style={[
          styles.PlaceHolder,
          TextStyle,
          {
            fontSize: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 13],
            }),
            bottom: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 24],
            }),
            color: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.greyDark, colors.dark],
            }),
            borderBottomColor: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.greyDark, colors.dark],
            }),
          },
        ]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        style={[styles.inputStyle, style]}
        {...others}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  FloatingLabelInput: {
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.blueLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlaceHolder: {
    position: 'absolute',
    bottom: 6,
    fontSize: 16,
    color: colors.dark,
    fontFamily: 'Poppins-Medium',
    marginLeft: 3,
  },
  inputStyle: {
    flexGrow: 1,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    padding: 2,
    paddingLeft: 3,
  },
  eye: {height: 20, width: 20, marginRight: 5},
});

export default memo(FloatingLabelInput);
