'use strict';
import React, {memo, useCallback, useLayoutEffect, useRef} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ScreenProps} from '../../navigation/navigation.types';
import {useForm} from 'react-hook-form';
import {TaskType} from '../../types/task.type';
import ControlledInput from '../../components/common/ControlledInput';
import Button from '../../components/common/Button';
import gs from '../../theme/gs';
import colors from '../../theme/colors';
import TaskCategory from '../../constants/TaskCategory';
import FlexButton from '../../components/common/FlexButton';
import {Text600} from '../../components/common/Texts';
import {Icons} from '../../assets';
import DateTimePick from '../../components/app/DateTimePick';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {addTaskAction} from '../../store/taskSlice';
import {getUniqueId} from '../../util';
import CategoryComp from '../../components/app/CategoryComp';

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
      category: defaultData?.category || 'All',
      id: defaultData?.id || '',
      isCompleted: defaultData?.isCompleted || false,
    },
    reValidateMode: 'onChange',
    mode: 'onSubmit',
  });

  const selectedCat = watch('category');

  const onSubmit = useCallback(
    (data: TaskType) => {
      if (isEdit) {
        dispatch(addTaskAction({...data}));
      } else if (isAdd) {
        const id = getUniqueId();
        dispatch(addTaskAction({...data, id: id}));
      } else {
      }
      navigation.goBack();
    },
    [isAdd, isEdit],
  );

  const handleDateTimeSelect = useCallback(
    (data: {date: string; field: string}) => {
      if (data.field == 'date') {
        setValue('date', moment(data.date).format('DD-MM-YYYY'));
      } else if (data.field == 'start') {
        setValue('start', moment(data.date).format('HH:mm A'));
      } else if (data.field == 'end') {
        setValue('end', moment(data.date).format('HH:mm A'));
      }
    },
    [],
  );

  const openDateModal = useCallback((forField: 'date' | 'start' | 'end') => {
    dateModalRef.current.open({
      type: forField == 'date' ? 'date' : 'time',
      field: forField,
    });
  }, []);

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
            style={styles.inputTime}
            name="start"
            placeholder="Start Time"
            inputConfig={{editable: false}}
            onPress={openDateModal.bind(null, 'start')}
            enablePress={isAdd || isEdit}
          />
          <ControlledInput
            control={control}
            style={styles.inputTime}
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
          title="Create Task"
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
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  times: {flexDirection: 'row', justifyContent: 'space-between', gap: 25},
  inputTime: {flex: 1},
  button: {marginTop: 40},
});

export default memo(TaskCreate);
