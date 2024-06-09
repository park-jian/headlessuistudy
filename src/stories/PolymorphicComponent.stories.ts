import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'; // 수정된 import 문

import { PolymorphicComponent } from './PolymorphicComponent';

const meta = {
  title: 'Example/PolymorphicComponent',
  component: PolymorphicComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof PolymorphicComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'PolymorphicComponent',
  },
};

export const Secondary: Story = {
  args: {
    label: 'PolymorphicComponent',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'PolymorphicComponent',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'PolymorphicComponent',
  },
};