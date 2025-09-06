import { useEffect, useState } from 'react';

interface ClockAnalogProps {
  tz: string;
  size?: number;       // px
  className?: string;
}

type TParts = { h: number; m: number; s: number };

function partsInZone(tz: string): TParts {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const num = (name: string) =>
    Number(parts.find(p => p.type === name)?.value ?? '0');

  const h = num('hour');
  const m = num('minute');
  const s = num('second');
  return { h, m, s };
}

export default function ClockAnalog({ tz, size = 160, className }: ClockAnalogProps) {
  const [p, setP] = useState<TParts>(() => partsInZone(tz));

  useEffect(() => {
    const id = setInterval(() => setP(partsInZone(tz)), 1000);
    return () => clearInterval(id);
  }, [tz]);

  const radius = size / 2;
  const hourAngle = ((p.h % 12) + p.m / 60) * 30;     // 360/12
  const minAngle = (p.m + p.s / 60) * 6;              // 360/60
  const secAngle = p.s * 6;

  return (
    <div
      className={`analog-clock ${className ?? ''}`}
      style={{ width: size, height: size }}
      aria-label={`Analog clock for ${tz}`}
    >
      <div className="ac-face" />
      <div
        className="ac-hand ac-hour"
        style={{
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          height: radius * 0.55
        }}
      />
      <div
        className="ac-hand ac-minute"
        style={{
          transform: `translate(-50%, -100%) rotate(${minAngle}deg)`,
          height: radius * 0.75
        }}
      />
      <div
        className="ac-hand ac-second"
        style={{
          transform: `translate(-50%, -100%) rotate(${secAngle}deg)`,
          height: radius * 0.85
        }}
      />
      <div className="ac-center" />
    </div>
  );
}