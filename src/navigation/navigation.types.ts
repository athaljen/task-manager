import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppScreens} from '../constants';
import {TaskType} from '../types/task.type';

export type AppStackParamList = {
  [AppScreens.MainTab]: undefined;
  [AppScreens.TaskCreate]: {action: 'edit' | 'view' | 'add'; data?: TaskType};
};

export type TabNavParamList = {
  [AppScreens.TasksScreen]: undefined;
  [AppScreens.DashBoardScreen]: undefined;
};

export type TopTabParamList = {
  [AppScreens.Pending]: undefined;
  [AppScreens.Completed]: undefined;
};

/// CombinedParamList is a union of all navigation
type CombinedParamList = AppStackParamList & TabNavParamList & TopTabParamList;

/// RootNavigation is a union of all navigation
export type RootNavigations = NavigationProp<CombinedParamList>;

export type ScreenProps<
  S extends keyof CombinedParamList = keyof CombinedParamList,
> = {
  navigation: RootNavigations;
  route: RouteProp<CombinedParamList, S>;
};

///for hooks
export type useNavigationType = NavigationProp<CombinedParamList>;
