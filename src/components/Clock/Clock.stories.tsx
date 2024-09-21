import type { Meta, StoryObj } from '@storybook/react';

import { Clock } from './Clock';

const meta: Meta<typeof Clock> = {
    title: 'Components/Clock',
    component: Clock,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
        },
        use24HourFormat: {
            control: { type: 'boolean' },
        },
        showTenths: {
            control: { type: 'boolean' },
        },
        isAnalog: {
            control: { type: 'boolean' },
        },
        showDate: {
            control: { type: 'boolean' },
        },
        showTimeZone: {
            control: { type: 'boolean' },
        },
        locale: {
            control: { type: 'select' },
        }
    },
};

export default meta;
type Story = StoryObj<typeof Clock>;

export const Default: Story = {
    args: {
        color: 'default',
        size: 'medium',
        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        locale: 'en-US',
    },
};

export const Analog: Story = {
    args: {
        color: 'default',
        size: 'medium',
        use24HourFormat: true,
        showTenths: false,
        isAnalog: true,
        showDate: false,
        showTimeZone: false,
        locale: 'en-US',
    },
};

export const Red: Story = {
    args: {
        color: 'red',
        size: 'medium',
        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        locale: 'en-US',
    },
};

export const Green: Story = {
    args: {
        color: 'green',
        size: 'medium',
        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        locale: 'en-US',
    },
};

export const Blue: Story = {
    args: {
        color: 'blue',
        size: 'medium',
        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        locale: 'en-US',
    },
};
