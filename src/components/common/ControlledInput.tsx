'use strict';
import {
  Pressable,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import colors from '../../theme/colors';
import {Text500} from './Texts';
import FloatingLabelInput from './FloatingLabelInput';

type InputProps = {
  control: Control<any>;
  name: string;
  style?: ViewStyle;
  validation?: RegisterOptions['validate'];
  inputStyle?: TextInputProps['style'];
  placeholder?: string;
  inputConfig?: TextInputProps;
  errorMessage?: string;
  defaultValue?: string;
  BottomViewStyle?: ViewStyle;
  required?: any;
  onPress?: () => void;
  enablePress?: boolean;
};

const ControlledInput = (props: InputProps) => {
  const {
    control,
    inputConfig,
    name,
    style,
    validation,
    inputStyle,
    placeholder,
    errorMessage,
    defaultValue,
    BottomViewStyle,
    required,
    onPress,
    enablePress,
  } = props;

  return (
    <Pressable
      style={[styles.mainContainer, style]}
      disabled={!enablePress}
      onPress={onPress}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{validate: validation, required: required}}
        render={({field: {onChange, value}}) => (
          <FloatingLabelInput
            style={[styles.inputStyle, inputStyle]}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder || name}
            {...inputConfig}
            autoCapitalize="none"
            defaultValue={defaultValue}
            ViewStyle={BottomViewStyle}
          />
        )}
      />
      <Text500 style={styles.errorStyle}>{errorMessage}</Text500>
    </Pressable>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  mainContainer: {marginTop: 5},
  inputStyle: {},
  errorStyle: {
    color: colors.red,
    fontSize: 12,
    marginTop: 3,
    marginStart: 5,
    alignSelf: 'flex-end',
  },
});
