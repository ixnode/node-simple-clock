import React, { useEffect, useState } from 'react';
import './Clock.scss';

export interface ClockProps {
    /** What font color to use. */
    color?: 'default' | 'red' | 'green' | 'blue';

    /** How large should the clock be? */
    size?: 'small' | 'medium' | 'large';

    /** Use 24 hour format? true for 24h, false for AM/PM */
    use24HourFormat?: boolean;

    /** Show tenth of a second? */
    showTenths?: boolean;

    /** Show an analog clock? */
    isAnalog?: boolean,

    /** Show date? */
    showDate?: boolean;

    /** Should a time zone be displayed? */
    showTimeZone?: boolean,

    /** Which locale should be displayed? */
    locale?: 'en-US'|'en-GB'|'de-DE'|'es-ES'|'fr-FR'|'it-IT'|'nl-NL'|'pl-PL'|'pt-BR'|'ru-RU'|'sv-SE'|'zh-CN'|'zh-TW';
}

export const Clock: React.FC<ClockProps> = ({
    color = 'default',
    size = 'medium',
    use24HourFormat = true,
    showTenths = false,
    isAnalog = false,
    showDate = false,
    showTimeZone = false,
    locale = 'en-US',
}) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), showTenths ? 100 : 1000);
        return () => clearInterval(timer);
    }, [showTenths]);

    /* Date formatting */
    const formattedDate = showDate
        ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(time)
        : '';

    /* Time formatting */
    const formattedTime = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24HourFormat, /* Switch between 12-hour and 24-hour format */
    }).format(time);

    const formattedTenths = showTenths ? Math.floor(time.getMilliseconds() / 100) : null;

    /* Time zone formatting */
    const formattedTimeZone = showTimeZone
        ? new Intl.DateTimeFormat(locale, { timeZoneName: 'short' }).format(time).split(' ')[1]
        : '';

    /* Analog clock - Calculation of rotation angles for hands */
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 - 90;
    const minuteDegrees = (minutes / 60) * 360 - 90;
    const secondDegrees = (seconds / 60) * 360 - 90;

    // Create hour marks
    const marks = Array.from({ length: 12 }).map((_, index) => {
        const isLongMark = [0, 3, 6, 9].includes(index); // Long marks for 12, 3, 6, 9
        const markClass = isLongMark ? 'mark mark-long' : 'mark mark-short';
        const rotation = `rotate(${index * 30}deg)`; // 30 degrees per hour mark
        return <div key={index} className={markClass} style={{ transform: rotation }}>
            <div className="mark-line" />
        </div>;
    });

    const hourHandStyle = {
        transform: `rotate(${hourDegrees}deg)`,
        transition: hours === 0 ? 'none' : 'transform 0.05s ease-in-out', /* Disable transition at 0 minutes. */
    };

    const minuteHandStyle = {
        transform: `rotate(${minuteDegrees}deg)`,
        transition: minutes === 0 ? 'none' : 'transform 0.05s ease-in-out', /* Disable transition at 0 minutes. */
    };

    const secondHandStyle = {
        transform: `rotate(${secondDegrees}deg)`,
        transition: seconds === 0 ? 'none' : 'transform 0.05s ease-in-out', /* Disable transition at 0 seconds. */
    };

    return (
        <div className={'clock' + ' ' + color + ' ' + size}>
            {isAnalog ? (
                <div className="analog-clock">
                    <div className="clock-face">
                        {marks}
                        <div className="hand hour-hand" style={hourHandStyle} />
                        <div className="hand minute-hand" style={minuteHandStyle} />
                        <div className="hand second-hand" style={secondHandStyle} />
                        <div className="point">
                            <div className="point-marker" />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {showDate && <>{formattedDate} - </>}
                    {formattedTime}
                    {showTenths && <span className={'tents'}>.{formattedTenths}</span>}
                    {showTimeZone && <> {formattedTimeZone}</>}
                </>
            )}
        </div>
    );
};
