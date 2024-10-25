import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppScreens} from '../constants';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type AppStackParamList = {
  [AppScreens.MainTab]: undefined;
  [AppScreens.TaskCreate]: undefined;
};

export type TabNavParamList = {
  [AppScreens.TasksScreen]: undefined;
  [AppScreens.DashBoardScreen]: undefined;
};

/// CombinedParamList is a union of all navigations
type CombinedParamList = AppStackParamList & TabNavParamList;

/// RootNavigations is a union of all navigations
export type RootNavigations = NavigationProp<CombinedParamList>;

export type ScreenProps<
  S extends keyof CombinedParamList = keyof CombinedParamList,
> = {
  navigation: RootNavigations;
  route: RouteProp<CombinedParamList, S>;
};

///for hooks
export type useNavigationType = NavigationProp<CombinedParamList>;
