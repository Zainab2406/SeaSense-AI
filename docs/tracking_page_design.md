# Real-time Tracking Page Architecture

## 1. Component Architecture
The tracking page will use a composition-based approach to separate map logic from UI interactions.

```
src/app/dashboard/tracking/
├── page.tsx                # Main entry, handles page-level state
├── _components/
│   ├── tracking-map.tsx    # Google Maps wrapper (Client Component)
│   ├── vessel-panel.tsx    # Desktop/Mobile side panel for details
│   ├── stats-bar.tsx       # Live count (Active, SOS, Offline)
│   └── replay-controls.tsx # Play/Pause/Slider for history mode
└── _hooks/
    ├── use-vessel-sync.ts  # Logic for syncing state with WebSocket
    └── use-map-markers.ts  # Logic for marker clustering & updates
```

## 2. Map Initialization Pattern
Use `@googlemaps/js-api-loader` for lazy-loading the API and ensuring it's only initialized once.

- **Marker Clustering**: Use the standard `@googlemaps/markerclusterer` to handle 1000+ vessels.
- **Marker Reference**: Store individual markers in a `Map<vesselId, google.maps.marker.AdvancedMarkerElement>` for O(1) updates without re-rendering the entire map.

## 3. Marker Update Strategy
To avoid performance bottlenecks:
1. **Throttled State**: The WebSocket hook receives updates but potentially emits a "buffered" update to the React state every 1 second.
2. **Direct Manipulation**: Bypass React for marker position updates. Use `vesselMarkers.get(id).position = newCoords`.
3. **Immutability vs Mutability**: Keep the "Vessel Data" immutable in React state for the side panel, but use mutable references for Map objects.

## 4. Performance Considerations
- **AdvancedMarkerElement**: Use the newer `AdvancedMarkerElement` (part of the Web Components-based Marker API) for better performance and CSS styling.
- **Visibility Filtering**: Use `ST_DWithin` or standard geographic bounds checking to only render/animate markers within the current viewport if the scale exceeds 5k+ vessels.
- **Offscreen Processing**: Carry out clustering calculations in a Web Worker if markers are dynamic and high-frequency.

## 5. Implementation Plan

### Phase 1: Foundation
- [ ] Create `tracking-map.tsx` with basic Google Maps initialization.
- [ ] Implement `useTrackingSocket` integration on the tracking page.
- [ ] Setup `use-vessel-sync` to maintain a local `Record<string, VesselLocation>` state.

### Phase 2: Visualization
- [ ] Integrate `@googlemaps/markerclusterer`.
- [ ] Implement `AdvancedMarkerElement` with custom CSS for vessel heading (rotation).
- [ ] Implement `Polyline` rendering for the currently selected vessel's recent path.

### Phase 3: Interactions
- [ ] Add `vessel-panel.tsx` for displaying speed, last seen, and vessel info.
- [ ] Implement "History Replay" mode (fetching points from Prisma via API).
- [ ] Add SOS visual feedback (pulsing markers).

### Phase 4: Optimization
- [ ] Implement cleanup logic for `socket.off` and map event listeners.
- [ ] Optimize marker updates for high-frequency data (throttling).
- [ ] Verify 1000+ marker stability.
```typescript
// Sample Marker Update Logic
const updateVesselMarker = (vessel: VesselUpdate) => {
  const marker = markersRef.current.get(vessel.id);
  if (marker) {
    marker.position = { lat: vessel.lat, lng: vessel.lng };
    // Rotate vessel icon using CSS transform on the marker element
    const element = marker.element as HTMLElement;
    element.style.transform = `rotate(${vessel.heading}deg)`;
  }
};
```
