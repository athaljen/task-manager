'use strict';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DashBoardScreen from '../screens/Tabs/DashBoardScreen';
import {TopTabParamList} from './navigation.types';
import colors from '../theme/colors';

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const DashboardNav = () => {
  return (
    <TopTab.Navigator
      sceneContainerStyle={styles.bgBlue}
      style={styles.bgBlue}
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.black,
        tabBarPressColor: 'transparent',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarAndroidRipple: {radius: 0},
      }}>
      <TopTab.Screen name="Pending" component={DashBoardScreen} />
      <TopTab.Screen name="Completed" component={DashBoardScreen} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bgBlue: {backgroundColor: colors.blue},
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 3,
    marginRight: 10,
  },
  tabBarIndicatorStyle: {
    height: '85%',
    borderRadius: 35,
    marginBottom: 4,
    width: '47%',
    marginLeft: 5,
  },
  tabBarStyle: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 30,
    elevation: 0,
  },
});

export default memo(DashboardNav);
