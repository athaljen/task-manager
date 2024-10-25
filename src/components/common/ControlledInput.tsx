'use strict';
import {StyleSheet, TextInputProps, View, ViewStyle} from 'react-native';
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
  errorMessage?: any;
  defaultValue?: string;
  BottomViewStyle?: ViewStyle;
  currency?: string;
  required?: any;
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
  } = props;

  return (
    <View style={[styles.mainContainer, style]}>
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
    </View>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  mainContainer: {marginTop: 15},
  inputStyle: {},
  errorStyle: {
    color: colors.red,
    fontSize: 12,
    marginTop: 5,
  },
});
