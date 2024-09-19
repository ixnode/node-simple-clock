import React, { useEffect, useState } from 'react';
import './Clock.scss';

export interface ClockProps {
    /** What background color to use */
    color?: 'default' | 'red' | 'green' | 'blue';
    /** How large should the button be? */
    size?: 'small' | 'medium' | 'large';
}

export const Clock: React.FC<ClockProps> = ({
    color = 'default',
    size = 'medium',
}) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div className={'clock' + ' ' + color + ' ' + size}>
            {hours}:{minutes}:{seconds}
        </div>
    );
};
