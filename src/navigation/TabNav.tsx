'use strict';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {Image, ImageProps} from 'react-native';
import {TabNavParamList} from './navigation.types';
import TasksScreen from '../screens/Tabs/TasksScreen';
import {Icons} from '../assets';
import gs from '../theme/gs';
import colors from '../theme/colors';
import DashboardNav from './DashboardNav';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<TabNavParamList>();

const tabBarIcon = (
  icon: ImageProps['source'],
  {focused}: {focused: boolean},
) => {
  return (
    <Image
      source={icon}
      style={gs.Icon20}
      resizeMode="contain"
      tintColor={focused ? colors.blue : colors.grey}
    />
  );
};

const TabNav = () => {
  const {top} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.grey,
        tabBarLabelStyle: [gs.fw600, gs.ffPoppinsSemiBold, gs.fs12],
        tabBarStyle: {borderTopRightRadius: 20, borderTopLeftRadius: 20},
        tabBarItemStyle: {marginTop: 5},
        tabBarHideOnKeyboard: true,
      }}
      sceneContainerStyle={[{backgroundColor: colors.blue, paddingTop: top}]}>
      <Tab.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{
          tabBarIcon: tabBarIcon.bind(this, Icons.task),
          title: 'Tasks',
        }}
      />
      <Tab.Screen
        name="DashBoardScreen"
        component={DashboardNav}
        options={{
          tabBarIcon: tabBarIcon.bind(this, Icons.dashboards),
          title: 'Dashboard',
        }}
      />
    </Tab.Navigator>
  );
};

export default memo(TabNav);
