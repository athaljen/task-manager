import React, {memo} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';

type buttonProps = {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  onPress?: () => void;
};

const Button: React.FC<buttonProps & PressableProps> = props => {
  const {title, buttonStyle, titleStyle, onPress, ...rest} = props;

  return (
    <Pressable
      {...rest}
      style={({pressed}) => [
        styles.Button,
        buttonStyle,
        {opacity: pressed ? 0.9 : 1, transform: [{scale: pressed ? 0.97 : 1}]},
      ]}
      onPress={onPress}>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    elevation: 6,
    height: 40,
  },
  text: {
    color: colors.white,
    flexShrink: 1,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 2,
  },
});

export default memo(Button);
