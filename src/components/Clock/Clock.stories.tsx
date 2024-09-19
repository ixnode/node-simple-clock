import type { Meta, StoryObj } from '@storybook/react';

import { Clock } from './Clock';

const meta = {
    title: 'Example/Clock',
    component: Clock,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof Clock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: 'default',
        size: 'medium',
    },
};

export const Red: Story = {
    args: {
        color: 'red',
        size: 'medium',
    },
};

export const Green: Story = {
    args: {
        color: 'green',
        size: 'medium',
    },
};

export const Blue: Story = {
    args: {
        color: 'blue',
        size: 'medium',
    },
};

export default meta;
