'use strict';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenProps} from '../../navigation/navigation.types';
import {useForm} from 'react-hook-form';
import {TaskType} from '../../types/task.type';
import ControlledInput from '../../components/common/ControlledInput';

const TaskCreate = ({navigation}: ScreenProps<'TaskCreate'>) => {
  const {control} = useForm<TaskType>({
    defaultValues: {
      title: '',
      description: '',
      date: '',
      start: '',
      end: '',
      category: 'Default',
    },
  });

  return (
    <View style={styles.TaskCreate}>
      <ControlledInput control={control} name="title" />
      <ControlledInput control={control} name="description" />
      <ControlledInput control={control} name="date" />
      <View style={styles.times}>
        <ControlledInput control={control} style={styles.input} name="start" />
        <ControlledInput control={control} style={styles.input} name="end" />
      </View>
      <ControlledInput control={control} name="category" />
    </View>
  );
};

const styles = StyleSheet.create({
  TaskCreate: {flex: 1, padding: 16},
  times: {flexDirection: 'row', justifyContent: 'space-between', gap: 25},
  input: {flex: 1},
});

export default memo(TaskCreate);
