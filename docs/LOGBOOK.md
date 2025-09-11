# Logbook – TypeScript Benefits

## 1) Safer data models with interfaces and enums
We use `City`, `ClockSettings`, and `TimeZone` in `src/types.ts`. TypeScript prevents invalid shapes and enforces only valid time zone strings (enum or IANA string). This catches mistakes at compile time that JavaScript would miss.

## 2) Strongly typed hooks and context
`useLocalStorage<T>` returns a readonly tuple with the exact type `T`. Contexts in `App.tsx` (`CitiesContext`, `ClockSettingsContext`) ensure consumers access correctly typed values. In JS, accidental `any` would allow subtle runtime bugs.

## 3) Typed event handlers
Form events (e.g., `FormEvent<HTMLFormElement>`, `HTMLInputElement`) ensure we access `.value` safely and avoid `undefined` at runtime. This eliminates a class of bugs common in vanilla JS React forms.

---

# How TypeScript transpiles to JavaScript
TypeScript strips types and compiles modern TS/ES features down to browser-compatible JavaScript. Vite uses esbuild during dev and tsc for type-checking. The emitted JS is standard ECMAScript; all types (`interface`, `enum`, generics) are removed, while helpers may be injected for features not natively supported depending on target configuration.
