import { useParams, Link } from 'react-router-dom';
import ClockDigital from '../components/ClockDigital';
import ClockAnalog from '../components/ClockAnalog';
import { useCities } from '../App';

export default function CityDetail() {
  const { id } = useParams<{ id: string }>();
  const { cities } = useCities();
  const city = cities.find(c => c.id === id);

  if (!city) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">
          Stad hittades inte. <Link to="/">Tillbaka</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          height: 260,
          backgroundImage: `url(${city.imageUrl ?? ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: city.imageUrl ? 'none' : 'grayscale(80%)'
        }}
      />
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="mb-0">{city.name}</h2>
          <Link className="btn btn-outline-secondary btn-sm" to="/">
            ← Till listan
          </Link>
        </div>
        <p className="text-muted">Tidszon: {String(city.tz)}</p>

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="card p-3 h-100">
              <h5>Digital</h5>
              <ClockDigital tz={String(city.tz)} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card p-3 h-100 text-center">
              <h5>Analog</h5>
              <div className="d-flex justify-content-center">
                <ClockAnalog tz={String(city.tz)} size={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}