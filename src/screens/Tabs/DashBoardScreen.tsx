'use strict;';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenProps} from '../../navigation/navigation.types';
import {TaskType} from '../../types/task.type';
import TaskItem from '../../components/app/TaskItem';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTaskAction, selectTasks} from '../../store/taskSlice';
import gs from '../../theme/gs';
import colors from '../../theme/colors';
import SearchComponent from '../../components/app/SearchComponent';
import EmptyTask from '../../components/app/EmptyTask';
import {TaskActionType} from '../../types/index.type';

type FiltersType = {
  text: string;
  category: string;
};

const DashBoardScreen = memo(
  ({route, navigation}: ScreenProps<'Pending'> | ScreenProps<'Completed'>) => {
    const TasksState = useSelector(selectTasks);
    const [Tasks, setTasks] = useState<TaskType[]>([]);
    const isCompletedScreen = route.name === 'Completed';
    const [SelectedFilters, setSelectedFilters] = useState<FiltersType>({
      text: '',
      category: '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
      // Filter tasks based on selected filters
      setTasks(
        TasksState.filter(item => {
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
          const isCompletedMatch = isCompletedScreen
            ? item.isCompleted
            : !item.isCompleted;

          return isTextMatch && isCategoryMatch && isCompletedMatch;
        }),
      );
    }, [SelectedFilters, TasksState, isCompletedScreen]);

    const handleTaskNavigate = useCallback(
      (type: TaskActionType, data?: TaskType) => {
        if (type == 'add') {
          navigation.navigate('TaskCreate', {action: 'add'});
        } else if (type == 'edit') {
          navigation.navigate('TaskCreate', {action: 'edit', data});
        } else if (type == 'view') {
          navigation.navigate('TaskCreate', {action: 'view', data});
        } else if (type == 'delete' && data) {
          dispatch(deleteTaskAction(data));
        }
      },
      [],
    );

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
      <View style={gs.flex1}>
        <View style={[gs.ph5, gs.mt10]}>
          <SearchComponent
            onSearch={search => {
              setSelectedFilters(prev => ({...prev, ...search}));
            }}
            isFilterApplied={SelectedFilters.category ? true : false}
          />
        </View>
        <View style={styles.content}>
          <FlatList
            data={Tasks}
            renderItem={renderTasks}
            keyExtractor={item => item.id}
            maxToRenderPerBatch={15}
            initialNumToRender={15}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            style={gs.pt10}
            ListEmptyComponent={
              <EmptyTask
                message={
                  isCompletedScreen
                    ? 'No completed Task found!'
                    : 'No pending Task found!'
                }
              />
            }
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
});

export default DashBoardScreen;
