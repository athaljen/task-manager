import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {AppScreens} from '../constants';
import {AppStackParamList} from './navigation.types';
import gs from '../theme/gs';
import colors from '../theme/colors';
import {Image, StyleSheet} from 'react-native';
import TabNav from './TabNav';
import TaskCreate from '../screens/stack/TaskCreate';
import {Icons} from '../assets';

const Stack = createNativeStackNavigator<AppStackParamList>();

const headerLeft = () => (
  <Image source={Icons.Meeting} style={gs.Icon20} resizeMode="contain" />
);

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: gs.bgWhite,
        navigationBarColor: colors.white,
        headerStyle: styles.headerStyle,
        headerShadowVisible: false,
        headerLeft: headerLeft,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
      }}>
      <Stack.Screen
        name={AppScreens.MainTab}
        component={TabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppScreens.TaskCreate}
        component={TaskCreate}
        options={{title: '', contentStyle: styles.headerStyle}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {backgroundColor: colors.blue},
  headerTitle: {color: colors.white, fontFamily: 'Poppins-Bold'},
});

export default memo(AppStack);
