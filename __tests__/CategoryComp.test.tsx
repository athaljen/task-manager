import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CategoryComp from '../src/components/app/CategoryComp';
import TaskCategory from '../src/constants/TaskCategory';
import colors from '../src/theme/colors';
import {StyleSheet} from 'react-native';

describe('CategoryComp', () => {
  const mockOnSelect = jest.fn();
  const mockTitle = 'Select Task Category';

  it('renders correctly', () => {
    const {getByText} = render(
      <CategoryComp
        selected={TaskCategory.Work}
        onSelect={mockOnSelect}
        title={mockTitle}
      />,
    );

    expect(getByText(mockTitle)).toBeTruthy();

    Object.values(TaskCategory).forEach(category => {
      expect(getByText(category)).toBeTruthy();
    });
  });

  it('calls onSelect when category is selected', () => {
    const {getByText} = render(
      <CategoryComp selected={TaskCategory.Birthday} onSelect={mockOnSelect} />,
    );

    fireEvent.press(getByText(TaskCategory.Work));

    expect(mockOnSelect).toHaveBeenCalledWith(TaskCategory.Work);
  });

  it('applies selected and unselected styles', () => {
    const {getByTestId} = render(
      <CategoryComp selected={TaskCategory.Work} onSelect={mockOnSelect} />,
    );

    const selectedCategory = getByTestId(`categoryId-${TaskCategory.Work}`);
    const unselectedCategory = getByTestId(`categoryId-${TaskCategory.Birthday}`);

    const selectedCategoryStyle = StyleSheet.flatten(
      selectedCategory.props.style,
    );
    const unselectedCategoryStyle = StyleSheet.flatten(
      unselectedCategory.props.style,
    );

    expect(selectedCategoryStyle.backgroundColor).toBe(colors.blue);

    expect(unselectedCategoryStyle.backgroundColor).toBe(colors.blueLight);
  });
});
