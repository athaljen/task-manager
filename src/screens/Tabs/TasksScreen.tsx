import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ScreenProps} from '../../navigation/navigation.types';
import {TaskType} from '../../types/task.type';
import TaskItem from '../../components/app/TaskItem';
import colors from '../../theme/colors';
import moment from 'moment';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import FlexButton from '../../components/common/FlexButton';
import {Icons} from '../../assets';
import gs from '../../theme/gs';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTaskAction, selectTasks} from '../../store/taskSlice';
import SearchComponent from '../../components/app/SearchComponent';
import EmptyTask from '../../components/app/EmptyTask';
import {TaskActionType} from '../../types/index.type';
import {isIos} from '../../constants';

const Today = moment();

type FiltersType = {
  date: moment.Moment;
  text: string;
  category: string;
};

/// Task Screen
const TasksScreen = ({navigation}: ScreenProps<'TasksScreen'>) => {
  const TasksState = useSelector(selectTasks);
  // Filtered tasks
  const [Tasks, setTasks] = useState<TaskType[]>([]);
  const [SelectedFilters, setSelectedFilters] = useState<FiltersType>({
    date: Today,
    text: '',
    category: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Filter tasks based on selected filters
    setTasks(
      TasksState.filter(item => {
        const isDateMatch =
          item.date === moment(SelectedFilters.date).format('DD-MM-YYYY');
        const isTextMatch = SelectedFilters.text
          ? item.title
              ?.toLocaleLowerCase()
              .includes(SelectedFilters.text?.toLocaleLowerCase()) ||
            item.description
              ?.toLocaleLowerCase()
              .includes(SelectedFilters.text?.toLocaleLowerCase())
          : true;
        const isCategoryMatch = SelectedFilters.category
          ? item.category === SelectedFilters.category
          : true;

        return isDateMatch && isTextMatch && isCategoryMatch;
      }),
    );
  }, [SelectedFilters, TasksState]);

  // Handle task navigation
  const handleTaskNavigate = useCallback(
    (type: TaskActionType, data?: TaskType) => {
      if (type == 'add') {
        navigation.navigate('TaskCreate', {action: 'add'});
      } else if (type == 'edit' && data)
        navigation.navigate('TaskCreate', {action: 'edit', data});
      else if (type == 'view')
        navigation.navigate('TaskCreate', {action: 'view', data});
      else if (type == 'delete' && data) {
        dispatch(deleteTaskAction(data));
      }
    },
    [],
  );

  // Render tasks
  const renderTasks = useCallback(({item}: {item: TaskType}) => {
    return (
      <TaskItem
        item={item}
        onPress={handleTaskNavigate.bind(this, 'view')}
        onEdit={handleTaskNavigate.bind(this, 'edit')}
        onDelete={handleTaskNavigate.bind(this, 'delete')}
      />
    );
  }, []);

  return (
    <View style={[styles.TaskScreen]}>
      <ReactNativeCalendarStrip
        style={styles.calendarStyle}
        calendarHeaderStyle={styles.calendarHeader}
        calendarColor={colors.blue}
        headerText={moment(SelectedFilters.date).format('MMMM YYYY')}
        dateNameStyle={styles.dateText}
        dateNumberStyle={styles.dateText}
        iconLeftStyle={styles.iconStyle}
        iconRightStyle={styles.iconStyle}
        selectedDate={SelectedFilters.date}
        highlightDateNameStyle={styles.selectedDate}
        highlightDateNumberStyle={styles.selectedDate}
        highlightDateContainerStyle={styles.highlighted}
        scrollable={true}
        onDateSelected={d => {
          setSelectedFilters(prev => ({...prev, date: d}));
        }}
      />
      <SearchComponent
        isFilterApplied={SelectedFilters.category ? true : false}
        onSearch={search => {
          setSelectedFilters(prev => ({...prev, ...search}));
        }}
      />

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
          contentContainerStyle={styles.flatList}
          ListEmptyComponent={
            <EmptyTask
              message={
                TasksState.length
                  ? 'No Task found!'
                  : 'No Task found, Click on the + icon to add.'
              }
            />
          }
        />
      </View>
      <FlexButton
        style={styles.plusCont}
        onPress={() => handleTaskNavigate('add')}>
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
  flatList: {paddingTop: 5, paddingBottom: 70},
  calendarStyle: {
    height: 110,
    marginHorizontal: 8,
    width: isIos ? '95%' : 'auto',
  },
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
