import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {AppScreens} from '../constants';
import {AppStackParamList} from './navigation.types';
import gs from '../theme/gs';
import colors from '../theme/colors';
import {StyleSheet} from 'react-native';
import TabNav from './TabNav';
import TaskCreate from '../screens/stack/TaskCreate';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: gs.bgWhite,
        navigationBarColor: colors.white,
      }}>
      <Stack.Screen
        name={AppScreens.MainTab}
        component={TabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppScreens.TaskCreate}
        component={TaskCreate}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {backgroundColor: colors.blue},
});

export default memo(AppStack);
