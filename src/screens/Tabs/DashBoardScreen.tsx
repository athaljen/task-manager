'use strict;';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenProps} from '../../navigation/navigation.types';
import {TaskType} from '../../types/task.type';
import TaskItem from '../../components/app/TaskItem';
import {useSelector} from 'react-redux';
import {selectTasks} from '../../store/taskSlice';
import gs from '../../theme/gs';
import colors from '../../theme/colors';

const DashBoardScreen = memo(
  ({route, navigation}: ScreenProps<'Pending'> | ScreenProps<'Completed'>) => {
    const isCompletedScreen = route.name === 'Completed';
    const [Tasks, setTasks] = useState<TaskType[]>([]);
    const TasksState = useSelector(selectTasks);

    useEffect(() => {
      if (isCompletedScreen) {
        setTasks(TasksState.filter(task => task.isCompleted));
      } else {
        setTasks(TasksState.filter(task => !task.isCompleted));
      }
    }, [isCompletedScreen, TasksState]);

    const handleTaskNavigate = useCallback(
      (type: 'add' | 'edit' | 'view', data?: TaskType) => {
        if (type == 'add') navigation.navigate('TaskCreate', {action: 'add'});
        else if (type == 'edit')
          navigation.navigate('TaskCreate', {action: 'edit'});
        else if (type == 'view')
          navigation.navigate('TaskCreate', {action: 'view', data});
      },
      [],
    );

    const renderTasks = useCallback(({item}: {item: TaskType}) => {
      return (
        <TaskItem item={item} onPress={handleTaskNavigate.bind(this, 'view')} />
      );
    }, []);

    return (
      <View style={gs.flex1}>
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
