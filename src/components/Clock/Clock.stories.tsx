import type { Meta, StoryObj } from '@storybook/react';

import { Clock } from './Clock';

// @ts-ignore
const meta: Meta<typeof Clock> = {
    title: 'Components/Clock',
    component: Clock,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: { type: 'radio' },
            table: { category: 'Design' },
        },
        size: {
            control: { type: 'radio' },
            table: { category: 'Design' },
        },
        showBorder: {
            control: { type: 'boolean' },
            table: { category: 'Design' },
        },
        use24HourFormat: {
            control: { type: 'boolean' },
            table: { category: 'Clock' },
        },
        showTenths: {
            control: { type: 'boolean' },
            table: { category: 'Clock' },
        },
        isAnalog: {
            control: { type: 'boolean' },
            table: { category: 'Clock' },
        },
        showDate: {
            control: { type: 'boolean' },
            table: { category: 'Clock' },
        },
        showTimeZone: {
            control: { type: 'boolean' },
            table: { category: 'Clock' },
        },
        timeZoneType: {
            control: { type: 'radio' },
            table: { category: 'Clock' },
        },
        locale: {
            control: { type: 'select' },
            table: { category: 'Locale' },
        },
        timeZone: {
            control: { type: 'select' },
            options: {
                // @ts-ignore: Ignore TypeScript error for object-based options
                'UTC': 'UTC',
                'UTC-12 (Baker Island)': 'Etc/GMT+12',
                'UTC-11 (American Samoa)': 'Pacific/Pago_Pago',
                'UTC-10 (Hawaii - Honolulu)': 'Pacific/Honolulu',
                'UTC-9 (Alaska - Anchorage)': 'America/Anchorage',
                'UTC-8 (Pacific Time - Los Angeles, Vancouver)': 'America/Los_Angeles',
                'UTC-7 (Mountain Time - Denver, Phoenix)': 'America/Denver',
                'UTC-6 (Central Time - Chicago, Mexico City)': 'America/Chicago',
                'UTC-5 (Eastern Time - New York, Toronto)': 'America/New_York',
                'UTC-4 (Atlantic Time - Caracas, La Paz)': 'America/Caracas',
                'UTC-3 (Brasilia, Buenos Aires)': 'America/Sao_Paulo',
                'UTC-2 (South Georgia & South Sandwich Islands)': 'Atlantic/South_Georgia',
                'UTC-1 (Azores, Cape Verde)': 'Atlantic/Azores',
                'UTC+0 (London, Lisbon)': 'Europe/London',
                'UTC+1 (Berlin, Paris, Madrid)': 'Europe/Berlin',
                'UTC+2 (Athens, Cairo, Johannesburg)': 'Africa/Johannesburg',
                'UTC+3 (Moscow, Istanbul, Riyadh)': 'Europe/Moscow',
                'UTC+4 (Dubai, Baku)': 'Asia/Dubai',
                'UTC+5 (Pakistan - Karachi)': 'Asia/Karachi',
                'UTC+5:30 (India - New Delhi, Mumbai)': 'Asia/Kolkata',
                'UTC+6 (Bangladesh - Dhaka)': 'Asia/Dhaka',
                'UTC+7 (Bangkok, Hanoi, Jakarta)': 'Asia/Bangkok',
                'UTC+8 (Beijing, Singapore, Perth)': 'Asia/Shanghai',
                'UTC+9 (Tokyo, Seoul)': 'Asia/Tokyo',
                'UTC+10 (Sydney, Melbourne)': 'Australia/Sydney',
                'UTC+11 (Solomon Islands, New Caledonia)': 'Pacific/Guadalcanal',
                'UTC+12 (Auckland, Fiji)': 'Pacific/Auckland',
                'UTC+13 (Tonga, Samoa)': 'Pacific/Tongatapu',
                'UTC+14 (Line Islands - Kiritimati)': 'Pacific/Kiritimati',
            },
            table: { category: 'Locale' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Clock>;

export const Default: Story = {
    args: {
        color: 'default',
        size: 'medium',
        showBorder: false,

        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        timeZoneType: 'short',

        locale: 'en-US',
        timeZone: 'UTC',
    },
};

export const Analog: Story = {
    args: {
        color: 'default',
        size: 'medium',
        showBorder: false,

        use24HourFormat: true,
        showTenths: false,
        isAnalog: true,
        showDate: false,
        showTimeZone: false,
        timeZoneType: 'short',

        locale: 'en-US',
        timeZone: 'UTC',
    },
};

export const Red: Story = {
    args: {
        color: 'red',
        size: 'medium',
        showBorder: false,

        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        timeZoneType: 'short',

        locale: 'en-US',
        timeZone: 'UTC',
    },
};

export const Green: Story = {
    args: {
        color: 'green',
        size: 'medium',
        showBorder: false,

        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,
        timeZoneType: 'short',

        locale: 'en-US',
        timeZone: 'UTC',
    },
};

export const Blue: Story = {
    args: {
        color: 'blue',
        size: 'medium',
        showBorder: false,

        use24HourFormat: true,
        showTenths: false,
        isAnalog: false,
        showDate: false,
        showTimeZone: false,

        locale: 'en-US',
        timeZone: 'UTC',
    },
};
