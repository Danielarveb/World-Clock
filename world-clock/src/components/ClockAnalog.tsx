import { useEffect, useState } from 'react';

interface ClockAnalogProps {
  tz: string;
  size?: number;       // px (defaults to 350)
  className?: string;
}

type TParts = { h: number; m: number; s: number };

function partsInZone(tz: string): TParts {
  let formatter: Intl.DateTimeFormat;
  try {
    formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch {
    // Fallback to UTC if IANA string is invalid
    formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  const parts = formatter.formatToParts(new Date());

  const num = (name: string) =>
    Number(parts.find(p => p.type === name)?.value ?? '0');

  const h = num('hour');
  const m = num('minute');
  const s = num('second');
  return { h, m, s };
}

export default function ClockAnalog({ tz, size = 350, className }: ClockAnalogProps) {
  const [p, setP] = useState<TParts>(() => partsInZone(tz));

  useEffect(() => {
    const id = setInterval(() => setP(partsInZone(tz)), 1000);
    return () => clearInterval(id);
  }, [tz]);

  const hourAngle = ((p.h % 12) + p.m / 60) * 30;     // 360/12
  const minAngle = (p.m + p.s / 60) * 6;              // 360/60
  const secAngle = p.s * 6;

  return (
    <div className={`clock ${className ?? ''}`} aria-label={`Analog clock for ${tz}`}>
      <div className="wrap" style={{ width: size, height: size }}>
        <div className="hour" style={{ transform: `rotate(${hourAngle}deg)` }} />
        <div className="minute" style={{ transform: `rotate(${minAngle}deg)` }} />
        <div className="second" style={{ transform: `rotate(${secAngle}deg)` }} />
        <div className="dot" />
      </div>
    </div>
  );
}