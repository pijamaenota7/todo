import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions'

import { AddItemForm } from '../AddItemForm';
import { Task, TaskPropsType } from '../Task';
import { useState } from 'react';
import React from 'react';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    task: { id: '12312321ss', isDone: false, title: 'Js' },
    todolistId: 'adsdas2',
    removeTask: fn(),
    changeTaskStatus: fn(),
    changeTaskTitle: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDone: Story = {

};
export const TaskIsDone: Story = {
  args: {
    task: { id: '12312321ss1', isDone: true, title: 'CSS' },

  }
};

const ToggledTask = () => {

  const [task, setTask] = useState({ id: '12312321ss', isDone: false, title: 'Js' })
  function changeTaskStatus(id: string, isDone: boolean) {
    setTask({ ...task, isDone })
  }
  function changeTaskTitle(id: string, newTitle: string) {
    setTask({ ...task, title: newTitle })
  }

  return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('removeTask')} task={task} todolistId={'13312123123s'} />
}

export const ToggledTaskStory: Story = {
  render: (args: TaskPropsType) => <ToggledTask />
}

