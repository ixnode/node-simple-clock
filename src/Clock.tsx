import React, { useEffect, useState } from 'react';
import './Clock.css';

interface ClockProps {
  className?: string;
}

const Clock: React.FC<ClockProps> = ({ className = 'clock' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
      <div className={className}>
        {hours}:{minutes}:{seconds}
      </div>
  );
};

export default Clock;
