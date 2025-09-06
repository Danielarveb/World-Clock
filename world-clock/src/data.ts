import { City, TimeZone } from './types';

// Några populära städer färdiga att välja
export const POPULAR_CITIES: City[] = [
  {
    id: 'stockholm',
    name: 'Stockholm',
    tz: TimeZone.Stockholm,
    imageUrl:
      'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'london',
    name: 'London',
    tz: TimeZone.London,
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'new-york',
    name: 'New York',
    tz: TimeZone.NewYork,
    imageUrl:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    tz: TimeZone.LosAngeles,
    imageUrl:
      'https://images.unsplash.com/photo-1514517220037-9b6511ff3e53?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    tz: TimeZone.Tokyo,
    imageUrl:
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    tz: TimeZone.Sydney,
    imageUrl:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    tz: TimeZone.Dubai,
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    tz: TimeZone.Berlin,
    imageUrl:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'paris',
    name: 'Paris',
    tz: TimeZone.Paris,
    imageUrl:
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'delhi',
    name: 'Delhi',
    tz: TimeZone.Delhi,
    imageUrl:
      'https://images.unsplash.com/photo-1589308078058-918dc4b02f0c?q=80&w=1600&auto=format&fit=crop'
  }
].map(c => ({ ...c }));

// Lista med vanliga tidszoner (för <datalist>)
export const COMMON_TIMEZONES: string[] = [
  'Europe/Stockholm',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Australia/Sydney'
];