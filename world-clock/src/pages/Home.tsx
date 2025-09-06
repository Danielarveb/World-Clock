import { FormEvent, useMemo, useState } from 'react';
import { useCities } from '../App';
import { COMMON_TIMEZONES, POPULAR_CITIES } from '../data';
import CityCard from '../components/CityCard';

export default function Home() {
  const { cities, addCity, removeCity } = useCities();
  const [selectedId, setSelectedId] = useState<string>('stockholm');

  // Custom form state
  const [name, setName] = useState<string>('');
  const [tz, setTz] = useState<string>('Europe/Stockholm');

  const popularLeft = useMemo(
    () => POPULAR_CITIES.filter(p => !cities.some(c => c.id === p.id)),
    [cities]
  );

  function handleAddPopular(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = POPULAR_CITIES.find(p => p.id === selectedId);
    if (found) addCity(found);
  }

  function handleAddCustom(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !tz.trim()) return;
    const id = makeId(name);
    addCity({ id, name: name.trim(), tz: tz.trim(), imageUrl: undefined });
    setName('');
    setTz('Europe/Stockholm');
  }

  return (
    <div className="container py-4">
      <h1 className="mb-3">Världsklocka</h1>
      <p className="text-muted">
        Lägg till städer (förval eller egna) och visa tid som digital eller analog klocka.
        Dina val sparas i webbläsarens <code>localStorage</code>.
      </p>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Lägg till från vanliga städer</h5>
              <form className="d-flex gap-2" onSubmit={handleAddPopular}>
                <select
                  className="form-select"
                  value={selectedId}
                  onChange={e => setSelectedId(e.target.value)}
                >
                  {popularLeft.length === 0 ? (
                    <option>Alla förvalda är redan tillagda</option>
                  ) : (
                    popularLeft.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.tz}
                      </option>
                    ))
                  )}
                </select>
                <button className="btn btn-primary" type="submit" disabled={popularLeft.length === 0}>
                  Lägg till
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Lägg till egen stad</h5>
              <form className="row g-2" onSubmit={handleAddCustom}>
                <div className="col-12">
                  <label className="form-label">Stadens namn</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="t.ex. Rome"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Tidszon (IANA)</label>
                  <input
                    list="tz-list"
                    className="form-control"
                    value={tz}
                    onChange={e => setTz(e.target.value)}
                    placeholder="t.ex. Europe/Rome"
                  />
                  <datalist id="tz-list">
                    {COMMON_TIMEZONES.map(z => (
                      <option key={z} value={z} />
                    ))}
                  </datalist>
                  <small className="text-muted">
                    Exempel: Europe/Stockholm, Europe/Rome, America/Chicago, Asia/Bangkok
                  </small>
                </div>
                <div className="col-12">
                  <button className="btn btn-success" type="submit">
                    Lägg till egen stad
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mb-3">Mina städer</h4>
      {cities.length === 0 ? (
        <div className="alert alert-info">Inga städer ännu – lägg till ovan.</div>
      ) : (
        <div className="row g-3">
          {cities.map(city => (
            <div key={city.id} className="col-12 col-sm-6 col-lg-4">
              <div className="h-100">
                <CityCard city={city} onRemove={removeCity} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function makeId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return slug || `city-${Math.random().toString(36).slice(2, 8)}`;
}