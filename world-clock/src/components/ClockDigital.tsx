import { useEffect, useState } from 'react';

interface ClockDigitalProps {
  tz: string;               // IANA timezone
  showDate?: boolean;
  className?: string;
}

function nowInZone(tz: string) {
  // Returnera ISO-tid för att trigga uppdatering
  return new Date(
    new Date().toLocaleString('en-GB', { timeZone: tz })
  );
}

export default function ClockDigital({
  tz,
  showDate = true,
  className
}: ClockDigitalProps) {
  const [time, setTime] = useState<Date>(() => nowInZone(tz));

  useEffect(() => {
    const id = setInterval(() => setTime(nowInZone(tz)), 1000);
    return () => clearInterval(id);
  }, [tz]);

  const timeStr = time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const dateStr = time.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={className}>
      <div className="fs-3 fw-semibold">{timeStr}</div>
      {showDate && <div className="text-muted">{dateStr}</div>}
    </div>
  );
}