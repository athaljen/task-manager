import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {memo} from 'react';
import AppStack from './AppStack';

export const NavigationRef = createNavigationContainerRef();

const RootNav = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <AppStack />
    </NavigationContainer>
  );
};

export default memo(RootNav);
