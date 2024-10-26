'use strict';
import React, {memo} from 'react';
import {Pressable, PressableProps, ViewStyle} from 'react-native';

const FlexButton = (props: PressableProps) => {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        {transform: [{scale: pressed ? 0.97 : 1}]},
        props.style as ViewStyle,
      ]}
      accessible>
      {props.children}
    </Pressable>
  );
};

export default memo(FlexButton);
