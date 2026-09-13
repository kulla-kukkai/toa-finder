# 🚽 PooPooPeePee : Toilet finder (On going)

Free public restrooms are surprisingly hard to find in a lot of Swedish
towns — ask any tourist, or any local in a hurry. **PooPooPeePee** is a small
React app that uses your location and open map data to show you the closest
public toilets, with directions one tap away.

## What it does

- Asks for your location (with your permission, one click)
- Queries [OpenStreetMap](https://www.openstreetmap.org/) via the free,
  keyless **Overpass API** for toilets nearby
- Lists results closest-first, with distance, accessibility, opening hours
  and a "Get directions" link
- Shows everything on an interactive map alongside the list
- Handles the boring-but-important states: no geolocation support, blocked
  permissions, network failures, and "no toilets mapped near you yet"

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Leaflet](https://react-leaflet.js.org/) for the map (OpenStreetMap tiles)
- Plain CSS, one stylesheet per component — no CSS-in-JS, no framework
- Browser [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) — free, no API key required

No paid services, no API keys, no backend. Clone it and it just works.

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── components/
│   ├── Header/          # Wordmark + badge
│   ├── Hero/             # Headline, copy, illustration, entry point for search
│   ├── LocateButton/     # The "find toilets near me" button
│   ├── StatusPanel/      # Locating / searching / error / empty copy
│   ├── ToiletList/       # Scrollable list of results
│   ├── ToiletCard/       # One result: name, distance, tags, directions link
│   ├── MapView/          # Leaflet map with user + toilet pins
│   └── Footer/           # Data attribution + credits
├── context/
│   └── ToaContext.jsx    # All shared state lives here (see below)
├── hooks/                # Reserved for future custom hooks
├── utils/
│   ├── overpass.js       # Builds and sends the Overpass query, normalizes results
│   └── distance.js       # Haversine distance + human-friendly formatting
├── styles/
│   ├── tokens.css        # Design tokens: color, type, spacing, radius
│   └── global.css        # Reset + base element styles
├── App.jsx
└── main.jsx
```
