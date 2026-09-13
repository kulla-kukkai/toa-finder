# 🚽 Toa Finder

Free public restrooms are surprisingly hard to find in a lot of Swedish
towns — ask any tourist, or any local in a hurry. **Toa Finder** is a small
React app that uses your location and open map data to show you the closest
public toilets, with directions one tap away.

Built as a portfolio project while looking for a frontend internship.

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

Then open the local URL Vite prints (usually `http://localhost:5173`).
For it to actually find anything, allow location access when your browser
asks, and try it somewhere with decent OpenStreetMap toilet coverage — city
centres are much better mapped than suburbs. Adding a missing toilet takes
two minutes on [openstreetmap.org](https://www.openstreetmap.org/) if you
want to help fill in the gaps.

```bash
npm run build    # production build to dist/
npm run preview  # preview that build locally
npm run lint      # oxlint
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

Every component gets its own folder with a matching `.css` file — nothing
shares a stylesheet, so it's easy to find, change, or delete a piece in
isolation.

### Why Context instead of passing props down

The location, search status, and results are needed by components at very
different depths of the tree (the button that starts a search, the status
message, the list, and the map all need overlapping pieces of the same
state). Threading that through props would mean every component in between
has to forward data it doesn't use itself.

Instead, `ToaProvider` (in `src/context/ToaContext.jsx`) owns that state and
exposes it through a single `useToa()` hook. Any component that needs it —
`LocateButton`, `StatusPanel`, `ToiletList`, `MapView` — reads directly from
context, so there's no prop drilling and no component knows more than it
needs to.

The one place props *are* used deliberately is `ToiletList` → `ToiletCard`,
where each card just needs the single toilet object for that row — a normal,
one-level parent-to-child hand-off, not drilling.

## Data & attribution

Toilet locations come from [OpenStreetMap](https://www.openstreetmap.org/)
contributors, queried live through the public Overpass API
(`overpass-api.de`). Map tiles are the standard OpenStreetMap tile layer.
Both are free and don't require an API key, which is what makes this project
runnable by anyone with zero setup. Coverage depends entirely on how well a
given area has been mapped — dense in most city centres, patchier
elsewhere.

## Possible next steps

- Cache recent searches in `localStorage` so a repeat visit is instant
- Add a radius selector (currently fixed at 1.5 km)
- Filter by "wheelchair accessible" or "free only"
- Swap the plain-text SVG illustration for a small custom icon set
