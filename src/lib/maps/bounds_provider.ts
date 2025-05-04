import maplibregl from 'maplibre-gl'
import type { TrailData } from './data_provider'

export class BoundsProvider {
  constructor(private readonly trailsData: TrailData[]) {}

  getMarkerBounds(): maplibregl.LngLatBounds {
    const bounds = new maplibregl.LngLatBounds()

    for (const { startLatLng } of this.trailsData) {
      // Note the coordinate order: [lng, lat] for MapLibre
      bounds.extend([startLatLng[1], startLatLng[0]])
    }

    return bounds
  }
}
