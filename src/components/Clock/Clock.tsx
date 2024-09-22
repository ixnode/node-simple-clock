import React, {useEffect, useRef, useState} from 'react';
import './Clock.scss';

export interface ClockProps {
    /** What font color to use? */
    color?: 'default'|'red'|'green'|'blue';

    /** How large should the clock be? */
    size?: 'small'|'medium'|'large';

    /** Show border? */
    showBorder?: boolean;

    /** Use 24 hour format? true for 24h, false for AM/PM */
    use24HourFormat?: boolean;

    /** Show tenth of a second? */
    showTenths?: boolean;

    /** Show an analog clock? */
    isAnalog?: boolean,

    /** Show date? */
    showDate?: boolean;

    /** Should a timezone be displayed? */
    showTimeZone?: boolean,

    /** Which type of timezone should be displayed? */
    timeZoneType?: 'short'|'long';

    /** Which locale should be displayed? */
    locale?: 'en-US'|'en-GB'|'de-DE'|'es-ES'|'fr-FR'|'it-IT'|'nl-NL'|'pl-PL'|'pt-BR'|'ru-RU'|'sv-SE'|'zh-CN'|'zh-TW';

    /** Which time zone should be displayed? */
    timeZone?: string,
}

/**
 * Calculates the shadow offset according to the given angle.
 *
 * @param angle
 * @param hand
 */
const calculateShadowOffsets = (angle: number, hand: boolean = false) => {
    const angleShadow = -angle - 45;

    const radians = angleShadow * (Math.PI / 180);
    const offsetX = -Math.floor(1.5 * 100 * Math.sin(radians)) / 100;
    const offsetY = Math.floor(1.5 * 100 * Math.cos(radians)) / 100;

    return { offsetX, offsetY };
}

/**
 * Updates the shadow offsets for the given hand.
 *
 * @param refObject
 * @param angle
 */
const updateShadow = (refObject: React.RefObject<HTMLDivElement>, angle: number) => {
    const { offsetX, offsetY} = calculateShadowOffsets(angle, true);
    const boxShadowSeconds = shadowTemplate
        .replace("${offsetX}", offsetX.toString())
        .replace("${offsetY}", offsetY.toString());

    if (refObject.current) {
        refObject.current.style.boxShadow = boxShadowSeconds;
    }
}

const shadowTemplate = '${offsetX}em ${offsetY}em 1.5em rgba(0, 0, 0, 0.5)';

export const Clock: React.FC<ClockProps> = ({
    color = 'default',
    size = 'medium',
    showBorder = false,
    use24HourFormat = true,
    showTenths = false,
    isAnalog = false,
    showDate = false,
    showTimeZone = false,
    timeZoneType = 'short',
    locale = 'en-US',
    timeZone = 'UTC',
}) => {
    const [time, setTime] = useState(new Date());

    const hourHandRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const minuteHandRef = useRef<HTMLDivElement>(null);
    const secondHandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = new Date();
            const seconds = newTime.getSeconds();

            if (isAnalog && seconds === 1 && secondHandRef.current) {
                secondHandRef.current.style.transition = 'none';
                secondHandRef.current.style.transform = `rotate(0deg)`;
            }

            setTimeout(() => {
                if (isAnalog && seconds === 1 && secondHandRef.current) {
                    secondHandRef.current.style.transition = '';
                }
                setTime(newTime);
            }, 100);
        }, showTenths && !isAnalog ? 100 : 1000);

        return () => clearInterval(timer);
    }, [showTenths, isAnalog]);

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
        timeZone: timeZone, /* Time zone to display */
    }).format(time);

    const formattedTenths = showTenths ? Math.floor(time.getMilliseconds() / 100) : null;

    /* Time zone formatting */
    const formattedTimeZone = showTimeZone
        ? new Intl.DateTimeFormat(locale, { timeZone: timeZone, timeZoneName: timeZoneType }).format(time).split(', ')[1]
        : '';

    /* Analog clock - Calculation of rotation angles for hands */
    const hours = parseInt(new Intl.DateTimeFormat(locale, { hour: 'numeric', hour12: true, timeZone }).format(time));
    const minutes = parseInt(new Intl.DateTimeFormat(locale, { minute: 'numeric', timeZone }).format(time));
    const seconds = parseInt(new Intl.DateTimeFormat(locale, { second: 'numeric', timeZone }).format(time));

    const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;
    const minuteAngle = (minutes / 60) * 360;
    let secondAngle = (seconds === 0 ? 360 : (seconds / 60) * 360);

    /* Create hour marks */
    const marks = Array.from({ length: 12 }).map((_, index) => {
        const isLongMark = [0, 3, 6, 9].includes(index); // Long marks for 12, 3, 6, 9
        const markClass = 'mark' + (isLongMark ? ' mark-long' : ' mark-short') + ' mark-' + index;
        const angle = index * 30;
        const transform = `rotate(${angle}deg)`; // 30 degrees per hour mark
        const { offsetX, offsetY } = calculateShadowOffsets(angle);
        const boxShadow = shadowTemplate
            .replace("${offsetX}", offsetX.toString())
            .replace("${offsetY}", offsetY.toString());

        return <div key={index} className={markClass} style={{ transform }}>
            <div className="mark-line" style={{ boxShadow }} />
        </div>;
    });

    updateShadow(hourHandRef, hourAngle);
    updateShadow(minuteHandRef, minuteAngle);
    updateShadow(secondHandRef, secondAngle);

    const hourHandStyle = {
        transform: `rotate(${hourAngle}deg)`,
    };

    const minuteHandStyle = {
        transform: `rotate(${minuteAngle}deg)`,
    };

    const secondHandStyle = {
        transform: `rotate(${secondAngle}deg)`,
    };

    return (
        <div className={'clock' + ' ' + color + ' ' + size + ' ' + (showBorder ? 'with-border' : 'no-border')}>
            {isAnalog ? (
                <div className="analog-clock">
                    <div className="clock-face">
                        {marks}
                        <div className="hand hour-hand" style={hourHandStyle} ref={hourHandRef} />
                        <div className="hand minute-hand" style={minuteHandStyle} ref={minuteHandRef} />
                        <div className="hand second-hand" style={secondHandStyle} ref={secondHandRef} />
                        <div className="point">
                            <div className="point-marker" />
                        </div>
                    </div>

                    {showDate && <div className="display">
                        <div className="date-text">{formattedDate}{showTimeZone && <><br/>{formattedTimeZone}</>}</div>
                    </div>}
                </div>
            ) : (
                <>
                    {showDate && <>{formattedDate}, </>}
                    {formattedTime}
                    {showTenths && <span className={'tents'}>.{formattedTenths}</span>}
                    {showTimeZone && <> {formattedTimeZone}</>}
                </>
            )}
        </div>
    );
};
