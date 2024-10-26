import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import {TaskType} from '../src/types/task.type';
import TaskItem from '../src/components/app/TaskItem';

afterEach(cleanup);

const mockTask: TaskType = {
  id: '1',
  date: '01-10-2024',
  title: 'Test Task',
  description: 'This is a test task description.',
  isCompleted: false,
  category: 'Default',
  start: '09:00 AM',
  end: '10:00 AM',
};

const onPressMock = jest.fn();
const onEditMock = jest.fn();
const onDeleteMock = jest.fn();

describe('TaskItem', () => {
  it('renders correctly with data', () => {
    const {getByText} = render(
      <TaskItem
        item={mockTask}
        onPress={onPressMock}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
      />,
    );

    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('This is a test task description.')).toBeTruthy();
  });

  it('calls onPress when the task item is pressed', () => {
    const {getByText} = render(
      <TaskItem
        item={mockTask}
        onPress={onPressMock}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
      />,
    );

    fireEvent.press(getByText('Test Task'));
    expect(onPressMock).toHaveBeenCalledWith(mockTask);
  });

  it('opens menu on button press', async () => {
    const {getByTestId} = render(
      <TaskItem
        item={mockTask}
        onPress={onPressMock}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
      />,
    );

    fireEvent.press(getByTestId('menu-button'));
  });
});
