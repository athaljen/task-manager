import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {ScreenProps} from '../../navigation/navigation.types';
import {TaskType} from '../../types/task.type';
import TaskItem from '../../components/app/TaskItem';
import {Text600} from '../../components/common/Texts';
import colors from '../../theme/colors';
import moment from 'moment';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import FlexButton from '../../components/common/FlexButton';
import {Icons} from '../../assets';
import gs from '../../theme/gs';

const DummyTasks: TaskType[] = [
  {
    id: '1',
    date: '2021-10-01',
    title: 'Task 1',
    description: 'Description of Task 1',
    isCompleted: false,
    category: 'Default',
    start: '10:00 AM',
    end: '12:00 PM',
  },
  {
    id: '2',
    date: '2021-10-02',
    title: 'Task 2',
    description: 'Description of Task 2',
    isCompleted: false,
    category: 'Shopping',
    start: '11:30 AM',
    end: '12:00 PM',
  },
  {
    id: '3',
    date: '2021-10-03',
    title: 'Task 3',
    description: 'Description of Task 3',
    isCompleted: false,
    category: 'Cooking',
    start: '06:00 AM',
    end: '12:00 PM',
  },
];

const Today = moment();

const TasksScreen = ({navigation}: ScreenProps<'TasksScreen'>) => {
  const [Tasks, setTasks] = useState<TaskType[]>(DummyTasks || []);
  const [Date, setDate] = useState(Today);

  const handleNavigate = useCallback(() => {
    navigation.navigate('TaskCreate');
  }, []);

  const renderTasks = useCallback(({item}: {item: TaskType}) => {
    return <TaskItem item={item} />;
  }, []);

  return (
    <View style={styles.TaskScreen}>
      <View>
        <ReactNativeCalendarStrip
          style={styles.calendarStyle}
          calendarHeaderStyle={styles.calendarHeader}
          calendarColor={colors.blue}
          headerText={moment(Date).format('MMMM YYYY')}
          dateNameStyle={styles.dateText}
          dateNumberStyle={styles.dateText}
          iconLeftStyle={styles.iconStyle}
          iconRightStyle={styles.iconStyle}
          selectedDate={Date}
          highlightDateNameStyle={styles.selectedDate}
          highlightDateNumberStyle={styles.selectedDate}
          highlightDateContainerStyle={styles.highlighted}
          scrollable={true}
          onDateSelected={setDate}
        />
      </View>
      <StatusBar backgroundColor={colors.blue} barStyle={'light-content'} />
      <View style={styles.taskCont}>
        <FlatList
          data={Tasks}
          renderItem={renderTasks}
          keyExtractor={item => item.id}
          maxToRenderPerBatch={15}
          initialNumToRender={15}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
      </View>
      <FlexButton style={styles.plusCont} onPress={handleNavigate}>
        <Image
          source={Icons.plus}
          style={gs.Icon20}
          resizeMode="contain"
          tintColor={colors.blue}
        />
      </FlexButton>
    </View>
  );
};

const styles = StyleSheet.create({
  TaskScreen: {flex: 1, backgroundColor: colors.blue},
  taskCont: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  flatList: {paddingTop: 10},
  calendarStyle: {height: 110, marginHorizontal: 8},
  highlighted: {backgroundColor: colors.white, borderRadius: 8},
  dateText: {color: colors.white, fontFamily: 'Poppins-Bold'},
  iconStyle: {tintColor: colors.white},
  selectedDate: {color: colors.blue},
  calendarHeader: {color: colors.white, fontSize: 22},
  plusCont: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default memo(TasksScreen);
