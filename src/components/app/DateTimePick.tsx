'use strict;';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import colors from '../../theme/colors';
import DatePicker from 'react-native-date-picker';
import {Text600} from '../common/Texts';
import gs from '../../theme/gs';

type Props = {
  onSubmit: (data: {date: string; field: string}) => void;
};

type actionType = {type: 'time' | 'date'; field: string; date: Date};

const DateTimePick = forwardRef(({onSubmit}: Props, ref) => {
  const [ActionType, setActionType] = useState<actionType>();
  const [SelectedDate, setSelectedDate] = useState(new Date());

  useImperativeHandle(
    ref,
    () => ({
      open: (d: actionType) => {
        setActionType(d);
        setSelectedDate(d.date);
      },
    }),
    [],
  );

  const onSubmitHandler = () => {
    onSubmit({
      date: SelectedDate.toISOString(),
      field: ActionType?.field || '',
    });
    setActionType(undefined);
  };

  return (
    <Modal
      visible={!!ActionType}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <Pressable
        style={styles.DateTimePick}
        onPress={setActionType.bind(null, undefined)}>
        <View style={styles.content}>
          <View
            style={[gs.fdRow, gs.w100, gs.ph15, gs.mt10, gs.jcSpaceBetween]}>
            <Text600
              style={gs.textGray}
              onPress={setActionType.bind(null, undefined)}>
              Cancel
            </Text600>
            <Text600 style={gs.textBlue} onPress={onSubmitHandler}>
              Done
            </Text600>
          </View>
          <DatePicker
            date={SelectedDate}
            theme="light"
            mode={ActionType?.type}
            onDateChange={setSelectedDate}
          />
        </View>
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  DateTimePick: {
    flex: 1,
    backgroundColor: colors.backdrop,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DateTimePick;
