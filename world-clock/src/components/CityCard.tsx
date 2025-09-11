import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClockDigital from './ClockDigital';
import ClockAnalog from './ClockAnalog';
import { City } from '../types';
import { useClockSettings } from '../App';

interface CityCardProps {
  city: City;
  onRemove: (id: string) => void;
}

export default function CityCard({ city, onRemove }: CityCardProps) {
  const { settingsByCityId, setDisplayMode, removeSettings } = useClockSettings();
  const [mode, setMode] = useState<'digital' | 'analog'>(
    settingsByCityId[city.id]?.display ?? 'digital'
  );

  useEffect(() => {
    setDisplayMode(city.id, mode);
  }, [city.id, mode, setDisplayMode]);

  const handleToggle = () =>
    setMode(prev => (prev === 'digital' ? 'analog' : 'digital'));

  return (
    <div className="card shadow-sm h-100">
      {city.imageUrl && (
        <div
          style={{
            height: 120,
            backgroundImage: `url(${city.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{city.name}</h5>
          <span className="badge text-bg-secondary">{String(city.tz)}</span>
        </div>

        <div className="mb-3 text-center">
          {mode === 'digital' ? (
            <ClockDigital tz={String(city.tz)} />
          ) : (
            <ClockAnalog tz={String(city.tz)} />
          )}
        </div>

        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={handleToggle}>
            Visa {mode === 'digital' ? 'analog' : 'digital'}
          </button>
          <Link className="btn btn-primary btn-sm" to={`/city/${city.id}`}>
            Detaljvy
          </Link>
          <button
            className="btn btn-outline-danger btn-sm ms-auto"
            onClick={() => {
              onRemove(city.id);
              removeSettings(city.id);
            }}
          >
            Ta bort
          </button>
        </div>
      </div>
    </div>
  );
}