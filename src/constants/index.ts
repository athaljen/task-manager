'use strict';
import {Dimensions, PixelRatio, Platform} from 'react-native';

export const AppDimensions = Object.freeze({
  screenHeight: Dimensions.get('screen').height,
  screenWidth: Dimensions.get('screen').width,
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  pixelRatio: PixelRatio.get(),
});

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'ios';

export enum AuthScreens {}

export const AppScreens = Object.freeze({
  //stacks
  MainTab: 'MainTab',
  TaskCreate: 'TaskCreate',
  //main bottom tabs
  TasksScreen: 'TasksScreen',
  DashBoardScreen: 'DashBoardScreen',
  //top tab
  Pending: 'Pending',
  Completed: 'Completed',
});
