import { createContext, PropsWithChildren, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import { useLocalStorage } from './hooks/useLocalStorage';
import { City } from './types';
import { POPULAR_CITIES } from './data';

type CitiesCtx = {
  cities: City[];
  addCity: (city: City) => void;
  removeCity: (id: string) => void;
};

const CitiesContext = createContext<CitiesCtx | null>(null);

function CitiesProvider({ children }: PropsWithChildren) {
  // Starta med Stockholm förifylld
  const [cities, setCities] = useLocalStorage<City[]>('worldclock:cities', [
    POPULAR_CITIES[0]
  ]);

  const addCity = (city: City) => {
    setCities(prev =>
      prev.some(c => c.id === city.id)
        ? prev
        : [...prev, { ...city }]
    );
  };

  const removeCity = (id: string) => {
    setCities(prev => prev.filter(c => c.id !== id));
  };

  const value: CitiesCtx = { cities, addCity, removeCity };
  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

export function useCities() {
  const ctx = useContext(CitiesContext);
  if (!ctx) throw new Error('useCities must be used within CitiesProvider');
  return ctx;
}

export default function App() {
  return (
    <CitiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:id" element={<CityDetail />} />
      </Routes>
    </CitiesProvider>
  );
}