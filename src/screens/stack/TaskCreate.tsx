'use strict';
import React, {memo, useCallback, useLayoutEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ScreenProps} from '../../navigation/navigation.types';
import {useForm} from 'react-hook-form';
import {TaskType} from '../../types/task.type';
import ControlledInput from '../../components/common/ControlledInput';
import Button from '../../components/common/Button';
import gs from '../../theme/gs';
import colors from '../../theme/colors';
import DateTimePick from '../../components/app/DateTimePick';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {addTaskAction, updateTaskAction} from '../../store/taskSlice';
import CategoryComp from '../../components/app/CategoryComp';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const TaskCreate = ({
  navigation,
  route: {params},
}: ScreenProps<'TaskCreate'>) => {
  const isEdit = params?.action == 'edit';
  const isAdd = params?.action == 'add';
  const defaultData = params?.data;

  const dateModalRef = useRef<any>(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isAdd ? 'Create Task' : isAdd ? 'Edit Task' : 'Task Details',
    });
  }, [navigation, isAdd, isEdit]);

  const {
    control,
    formState: {errors},
    watch,
    setValue,
    handleSubmit,
  } = useForm<TaskType>({
    defaultValues: {
      title: defaultData?.title || '',
      description: defaultData?.description || '',
      date: defaultData?.date || '',
      start: defaultData?.start || '',
      end: defaultData?.end || '',
      category: defaultData?.category || 'Default',
      id: defaultData?.id || '',
      isCompleted: defaultData?.isCompleted || false,
    },
    reValidateMode: 'onChange',
    mode: 'onSubmit',
  });

  const selectedCat = watch('category');

  const onSubmit = useCallback(
    (data: TaskType) => {
      if (isAdd) {
        dispatch(addTaskAction({...data}));
        Toast.show({
          title: 'Task Created',
          textBody: 'Task has been created successfully',
          type: ALERT_TYPE.SUCCESS,
        });
      } else if (isEdit) {
        dispatch(updateTaskAction(data));
        Toast.show({
          title: 'Task Updated',
          textBody: 'Task has been updated successfully',
          type: ALERT_TYPE.SUCCESS,
        });
      } else {
        dispatch(
          updateTaskAction({...data, isCompleted: !defaultData?.isCompleted}),
        );
        Toast.show({
          title: 'Task Update',
          textBody: 'Task has been updated successfully',
          type: ALERT_TYPE.SUCCESS,
        });
      }

      navigation.goBack();
    },
    [isAdd, isEdit, dispatch, defaultData?.isCompleted],
  );

  const handleDateTimeSelect = useCallback(
    (data: {date: string; field: string}) => {
      if (data.field == 'date') {
        setValue('date', moment(data.date).format('DD-MM-YYYY'));
      } else if (data.field == 'start') {
        setValue('start', moment(data.date).format('hh:mm A'));
      } else if (data.field == 'end') {
        setValue('end', moment(data.date).format('hh:mm A'));
      }
    },
    [],
  );

  const openDateModal = useCallback(
    (forField: 'date' | 'start' | 'end') => {
      dateModalRef.current.open({
        type: forField == 'date' ? 'date' : 'time',
        field: forField,
        date: defaultData?.[forField]
          ? moment(
              defaultData?.[forField],
              forField == 'date' ? 'DD-MM-YYYY' : 'hh:mm A',
            ).toDate()
          : new Date(),
      });
    },
    [defaultData],
  );

  return (
    <View style={styles.TaskCreate}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={[gs.flex1, gs.fg1]}>
        <ControlledInput
          control={control}
          name="title"
          placeholder="Title"
          required={'Title is required'}
          errorMessage={errors.title?.message}
          inputConfig={{editable: isAdd || isEdit}}
        />
        <ControlledInput
          control={control}
          name="description"
          placeholder="Description"
          errorMessage={errors.description?.message}
          required={'Description is required'}
          inputConfig={{editable: isAdd || isEdit}}
        />
        <ControlledInput
          control={control}
          name="date"
          placeholder="Date"
          inputConfig={{editable: false}}
          errorMessage={errors.date?.message}
          required={'Date field is required'}
          onPress={openDateModal.bind(null, 'date')}
          enablePress={isAdd || isEdit}
        />
        <View style={styles.times}>
          <ControlledInput
            control={control}
            style={gs.flex1}
            name="start"
            placeholder="Start Time"
            inputConfig={{editable: false}}
            onPress={openDateModal.bind(null, 'start')}
            enablePress={isAdd || isEdit}
          />
          <ControlledInput
            control={control}
            style={gs.flex1}
            name="end"
            placeholder="End Time"
            inputConfig={{editable: false}}
            onPress={openDateModal.bind(null, 'end')}
            enablePress={isAdd || isEdit}
          />
        </View>
        <CategoryComp
          selected={selectedCat}
          onSelect={item => {
            setValue('category', item);
          }}
          disable={!isAdd && !isEdit}
        />
        <Button
          title={
            isAdd
              ? 'Create Task'
              : isEdit
              ? 'Update Task'
              : defaultData?.isCompleted
              ? 'Mark Incomplete'
              : 'Mark Complete'
          }
          buttonStyle={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
      <DateTimePick onSubmit={handleDateTimeSelect} ref={dateModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  TaskCreate: {
    flex: 1,
    backgroundColor: colors.blue,
    overflow: 'hidden',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  content: {flex: 1, padding: 16, backgroundColor: colors.white},
  times: {flexDirection: 'row', justifyContent: 'space-between', gap: 25},
  button: {marginTop: 40},
});

export default memo(TaskCreate);
