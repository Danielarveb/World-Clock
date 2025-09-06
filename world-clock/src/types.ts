// Grundtyper för tydlig TS
export type DisplayMode = 'digital' | 'analog';

// En liten enum med vanliga tidszoner (du kan skriva egna strängar också)
export enum TimeZone {
  Stockholm = 'Europe/Stockholm',
  London = 'Europe/London',
  NewYork = 'America/New_York',
  LosAngeles = 'America/Los_Angeles',
  Tokyo = 'Asia/Tokyo',
  Sydney = 'Australia/Sydney',
  Dubai = 'Asia/Dubai',
  Berlin = 'Europe/Berlin',
  Paris = 'Europe/Paris',
  Delhi = 'Asia/Kolkata'
}

// Tillåt både våra enum-värden och valfri IANA-sträng
export type AnyTimeZone = TimeZone | (string & {});

export interface City {
  id: string;         // unik id (t.ex. "stockholm" eller slumpad)
  name: string;       // t.ex. "Stockholm"
  tz: AnyTimeZone;    // t.ex. "Europe/Stockholm"
  imageUrl?: string;  // bakgrundsbild i detaljvy
}

export interface ClockSettings {
  display: DisplayMode;
}